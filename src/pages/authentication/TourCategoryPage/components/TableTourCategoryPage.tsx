import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Modal, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../../constants';
import { useShowNotification } from '../../../../components/Notification/Notification';
import { useDebounce } from '../../../../hooks/useDebounce';
import { TourCategory } from '../../../../models/TourCategory';
import { ColorMappingStatus, LabelMappingStatus } from '../../../../utils/mapping';
import { FilterParams, PaginateParams, SearchParams, SortParams } from '../../../../utils/types/ServiceResponse';
import { useDeleteTourCategory, useTourCategories } from '../hooks/useTourQueries';
import { NotFoundPage } from '../../../unauthentication/NotFoundPage/NotFoundPage';
export interface ParamsTourCategoryPage {
    pagination?: PaginateParams;
    searcher?: SearchParams;
    sort?: SortParams;
    filter?: FilterParams;
}

const TableTourCategoryPage: React.FC = () => {
    const navigate = useNavigate();
    const showNotification = useShowNotification();
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const debouncedSearchValue = useDebounce<string>(searchValue, 500);

    const [searchParams, setSearchParams] = useState<ParamsTourCategoryPage>({
        pagination: {
            page: 1,
            pageSize: 10
        }
    });

    const { data, isLoading, isFetching, error } = useTourCategories(searchParams);
    const deleteTourCategoryMutation = useDeleteTourCategory();
    const tourCategories = data?.data?.hits || [];

    useEffect(() => {
        setSearchParams((prev) => ({
            ...prev,
            searcher: debouncedSearchValue
                ? {
                      keyword: debouncedSearchValue,
                      field: 'title'
                  }
                : undefined
        }));
    }, [debouncedSearchValue]);

    const handleActionClick = async (key: string, record: TourCategory) => {
        switch (key) {
            case 'edit':
                navigate(RouteConfig.UpdateTourCategoryPage.getPath(record._id));
                break;
            case 'delete':
                setSelectedRowKeys([record._id]);
                showModal();
                break;
        }
    };

    const handleTableChange = (pagination: any) => {
        setSearchParams({
            ...searchParams,
            pagination: {
                page: pagination.current,
                pageSize: pagination.pageSize
            }
        });
    };

    const showModal = () => {
        setIsModelOpen(true);
    };

    const handleOKModal = () => {
        if (selectedRowKeys.length > 0) {
            // Xóa từng danh mục được chọn
            selectedRowKeys.forEach((id) => {
                deleteTourCategoryMutation.mutate(
                    { id: id.toString() },
                    {
                        onSuccess: () => {
                            showNotification('success', 'Xóa thành công', 'Danh mục tour đã được xóa thành công');
                        },
                        onError: () => {
                            showNotification(
                                'error',
                                'Xóa thất bại',
                                'Không thể xóa danh mục tour. Vui lòng thử lại sau.'
                            );
                        }
                    }
                );
            });
            setSelectedRowKeys([]);
        }
        setIsModelOpen(false);
    };

    const handleCancelModal = () => {
        setIsModelOpen(false);
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleCreateNew = () => {
        navigate(RouteConfig.CreateTourCategoryPage.path);
    };

    const handleFilter = (value: string) => {
        setSearchParams({
            ...searchParams,
            filter: {
                name: 'status',
                value: value
            }
        });
    };

    const columns: ColumnsType<TourCategory> = [
        {
            title: 'STT',
            dataIndex: 'key',
            width: 50,
            align: 'center',
            render: (_, __, index) => index + 1
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'title',
            width: 200,
            render: (title, record) => <Link to={RouteConfig.UpdateTourCategoryPage.getPath(record._id)}>{title}</Link>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 90,
            align: 'center',
            render: (status: keyof typeof ColorMappingStatus) => (
                <Tag color={ColorMappingStatus[status]}>{LabelMappingStatus[status]}</Tag>
            )
        },

        {
            title: 'Mô tả',
            dataIndex: 'description',
            width: 200,
            ellipsis: true,
            render: (description: string) => <>{description}</>
        },

        {
            title: 'Hành động',
            key: 'action',
            fixed: 'right',
            width: 80,
            align: 'center',
            render: (_, record) => (
                <Dropdown
                    menu={{
                        items: [
                            { key: 'edit', label: 'Sửa', icon: <EditOutlined /> },
                            { key: 'delete', label: 'Xoá', icon: <DeleteOutlined /> }
                        ],
                        onClick: ({ key }) => handleActionClick(key, record)
                    }}
                    trigger={['click']}
                >
                    <Button size='small'>
                        <MoreOutlined />
                    </Button>
                </Dropdown>
            )
        }
    ];

    if (error) {
        return <NotFoundPage />;
    }

    return (
        <div className='tour-table-container'>
            <h1 className='text-[22px]'>Danh sách danh mục tour</h1>

            {/* Header */}
            <div className='flex justify-end gap-4 mb-4'>
                <div>
                    <Input
                        placeholder='Tìm kiếm...'
                        prefix={<SearchOutlined />}
                        allowClear
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <div>
                    <Select
                        placeholder='Lọc theo trạng thái'
                        options={[
                            { value: 'active', label: 'Hoạt động' },
                            { value: 'inactive', label: 'Dừng hoạt động' },
                            { value: 'pending', label: 'Chờ duyệt' }
                        ]}
                        allowClear
                        className='w-[200px]'
                        onChange={(value) => handleFilter(value)}
                        value={searchParams.filter?.value}
                    />
                </div>
                <Button onClick={showModal} icon={<DeleteOutlined />} disabled={selectedRowKeys.length === 0}>
                    Xoá ({selectedRowKeys.length})
                </Button>
                <Button type='primary' icon={<PlusOutlined />} onClick={handleCreateNew}>
                    Tạo mới
                </Button>
            </div>

            {/* Table */}
            <Table<TourCategory>
                rowKey={(record) => record._id}
                bordered={true}
                size='small'
                columns={columns}
                dataSource={tourCategories}
                loading={isFetching || isLoading}
                rowSelection={{
                    selectedRowKeys,
                    onChange: (newSelectedRowKeys: React.Key[]) => {
                        setSelectedRowKeys(newSelectedRowKeys);
                    }
                }}
                scroll={{ x: 1000 }}
                onChange={handleTableChange}
                pagination={{
                    current: searchParams.pagination?.page,
                    pageSize: searchParams.pagination?.pageSize,
                    total: data?.data?.pagination?.totalRows,
                    position: ['bottomRight'],
                    className: 'ant-pagination-sticky',
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} bản ghi`
                }}
            />
            <Modal
                title={`Bạn có chắc muốn xoá ${selectedRowKeys.length} danh mục đã chọn?`}
                open={isModelOpen}
                onOk={handleOKModal}
                onCancel={handleCancelModal}
                confirmLoading={deleteTourCategoryMutation.isPending}
            >
                <p>Hành động này không thể hoàn tác.</p>
            </Modal>
        </div>
    );
};

export default TableTourCategoryPage;
