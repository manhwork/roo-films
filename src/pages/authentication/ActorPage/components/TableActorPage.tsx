import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../../../../hooks/useFetchData';
import { Actor } from '../../../../models/Actor';
import { RouteConfig } from '../../../../constants';

export default function TableActorPage() {
    const navigate = useNavigate();

    const { data, loading, error, refetch } = useFetchData('/actors', {
        method: 'GET'
    });

    const handleActionClick = (key: string, record: Actor) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateActorPage.getPath(record._id));
        } else if (key === 'delete') {
            console.log('Xoá', record);
        }
    };

    // Map API data về đúng định dạng Actor
    const actors: Actor[] = (data?.data || []).map((item: any) => ({
        _id: item.actorid?.toString(),
        name: item.name,
        originalName: item.originalname,
        bio: item.bio,
        birthDate: item.birthdate ? item.birthdate.slice(0, 10) : '',
        nationality: item.nationality,
        photoURL: item.photourl
    }));
    const columns: ColumnsType<Actor> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, __: any, index: number) => index + 1,
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
        {
            title: 'Hành động',
            key: 'action',
            fixed: 'right',
            width: 80,
            align: 'center',
            render: (_: any, record: Actor) => (
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
                dataSource={actors}
                loading={loading}
                scroll={{ x: 1000 }}
                pagination={{
                    current: data?.page,
                    pageSize: data?.limit,
                    total: data?.total,
                    position: ['bottomRight'],
                    className: 'ant-pagination-sticky',
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} bản ghi`
                }}
            />
        </div>
    );
}
