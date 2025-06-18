import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Modal, Select, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../../constants';
import { useDebounce } from '../../../../hooks/useDebounce';
import { Tour } from '../../../../models/Tour';
import { ColorMappingStatus, LabelMappingStatus } from '../../../../utils/mapping';
import { FilterParams, PaginateParams, SearchParams, SortParams } from '../../../../utils/types/ServiceResponse';
import { useDeleteTour, useTours } from '../hooks/useTourQueries';
import { NotFoundPage } from '../../../unauthentication/NotFoundPage/NotFoundPage';
import { useShowNotification } from '../../../../components/Notification/Notification';
export interface ParamsTourPage {
    pagination?: PaginateParams;
    searcher?: SearchParams;
    sort?: SortParams;
    filter?: FilterParams;
}

const TableTourPage: React.FC = () => {
    const navigate = useNavigate();
    const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const debouncedSearchValue = useDebounce<string>(searchValue, 500);
    const showNotification = useShowNotification();

    const [searchParams, setSearchParams] = useState<ParamsTourPage>({
        pagination: {
            page: 1,
            pageSize: 10
        }
    });

    const { data, isLoading, isFetching, error } = useTours(searchParams);
    const deleteTourMutation = useDeleteTour();
    const tours = data?.data?.hits || [];

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

    const handleActionClick = async (key: string, record: Tour) => {
        switch (key) {
            case 'edit':
                navigate(RouteConfig.UpdateTourPage.getPath(record._id));
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
            selectedRowKeys.forEach((id) => {
                deleteTourMutation.mutate(
                    { id },
                    {
                        onSuccess: () => {
                            showNotification('success', 'Xóa thành công', 'Tour đã được xóa thành công');
                        },
                        onError: () => {
                            showNotification('error', 'Xóa thất bại', 'Không thể xóa tour. Vui lòng thử lại sau.');
                        }
                    }
                );
            });
            setSelectedRowKeys([]);
        }
        setIsModelOpen(false);
    };

    const handleCancelModal = () => {
        setSelectedRowKeys([]);
        setIsModelOpen(false);
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleCreateNew = () => {
        navigate(RouteConfig.CreateTourPage.path);
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

    const columns: ColumnsType<Tour> = [
        {
            title: 'STT',
            dataIndex: 'key',
            width: 50,
            align: 'center',
            render: (_, __, index) => index + 1
        },
        {
            title: 'Tên tour',
            dataIndex: 'title',
            width: 200,
            render: (title, record) => <Link to={RouteConfig.UpdateTourPage.getPath(record._id)}>{title}</Link>
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
            title: 'Giá (VNĐ)',
            dataIndex: 'price',
            width: 120,
            render: (price: number) => `${price?.toLocaleString()}`
        },
        {
            title: 'Giảm giá (%)',
            dataIndex: 'discount',
            width: 100,
            render: (discount: number) => `${discount}`
        },
        {
            title: 'Số lượng',
            dataIndex: 'stock',
            width: 80
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
            <h1 className='text-[22px]'>Danh sách tour</h1>

            {/* Header */}
            <div className='flex justify-end gap-4 mb-4'>
                <div>
                    <Input
                        placeholder='Tìm kiếm theo tên Tour'
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
            <Table<Tour>
                rowKey={(record) => record._id}
                bordered={true}
                size='small'
                columns={columns}
                dataSource={tours}
                loading={isFetching || isLoading}
                rowSelection={{
                    selectedRowKeys,
                    onChange: (newSelectedRowKeys: React.Key[]) => {
                        setSelectedRowKeys(newSelectedRowKeys as string[]);
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
                title={`Bạn có chắc muốn xoá ${selectedRowKeys.length} tour đã chọn?`}
                open={isModelOpen}
                onOk={handleOKModal}
                onCancel={handleCancelModal}
                confirmLoading={deleteTourMutation.isPending}
            >
                <p>Bạn đã chọn {selectedRowKeys.length} tour để xóa. Hành động này không thể hoàn tác.</p>
            </Modal>
        </div>
    );
};

export default TableTourPage;
