import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../../../../hooks/useFetchData';
import { Actor } from '../../../../models/Actor';
import { RouteConfig } from '../../../../constants';

export default function TableActorPage() {
    const { data, error, loading, refetch } = useFetchData('/actors');

    const navigate = useNavigate();

    const handleActionClick = (key: string, record: Actor) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateActorPage.getPath(record._id));
        } else if (key === 'delete') {
            console.log('Xoá', record);
        }
    };

    const fakeData: Actor[] = [
        {
            _id: '1',
            name: 'Ngô Thanh Vân',
            originalName: 'Veronica Ngo',
            bio: '',
            birthDate: '1979-02-26',
            nationality: 'Việt Nam',
            photoURL: 'https://i.imgur.com/1.jpg'
        },
        {
            _id: '2',
            name: 'Johnny Trí Nguyễn',
            originalName: 'Johnny Nguyen',
            bio: '',
            birthDate: '1974-01-16',
            nationality: 'Việt Nam',
            photoURL: 'https://i.imgur.com/2.jpg'
        },
        {
            _id: '3',
            name: 'Lý Hải',
            originalName: 'Ly Hai',
            bio: '',
            birthDate: '1968-09-28',
            nationality: 'Việt Nam',
            photoURL: 'https://i.imgur.com/3.jpg'
        }
    ];

    const columns: ColumnsType<Actor> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            render: (_, __, index) => index + 1,
            align: 'center',
            width: 50
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: 200
        },
        {
            title: 'Tên gốc',
            dataIndex: 'originalName',
            key: 'originalName',
            width: 200
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthDate',
            key: 'birthDate',
            width: 150
        },
        {
            title: 'Quốc tịch',
            dataIndex: 'nationality',
            key: 'nationality',
            width: 150
        },
        // {
        //     title: 'Ảnh',
        //     dataIndex: 'photoURL',
        //     key: 'photoURL',
        //     render: (_, record) => <Image src={record.photoURL || ''} width={50} height={50} />
        // },
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

    return (
        <div>
            <h1 className='text-[22px]'>Danh sách diễn viên</h1>

            <div className='flex justify-end gap-4 mb-4'>
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => navigate(RouteConfig.CreateActorPage.path)}
                >
                    Tạo mới
                </Button>
            </div>

            <Table<Actor>
                rowKey={(record) => record._id}
                bordered={true}
                size='small'
                columns={columns}
                dataSource={fakeData}
                // dataSource={tours}
                // loading={isFetching || isLoading}
                // rowSelection={{
                //     selectedRowKeys,
                //     onChange: (newSelectedRowKeys: React.Key[]) => {
                //         setSelectedRowKeys(newSelectedRowKeys as string[]);
                //     }
                // }}
                scroll={{ x: 1000 }}
                // onChange={handleTableChange}
                pagination={{
                    // current: searchParams.pagination?.page,
                    // pageSize: searchParams.pagination?.pageSize,
                    total: data?.data?.pagination?.totalRows,
                    position: ['bottomRight'],
                    className: 'ant-pagination-sticky',
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} bản ghi`
                }}
            />
        </div>
    );
}
