import Table, { ColumnsType } from 'antd/es/table';
import { useFetchData } from '../../../hooks/useFetchData';
import { Genres } from '../../../models/Genres';
import { Button, Dropdown, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { RouteConfig } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export default function TableGenresPage() {
    const { data, error, loading, refetch } = useFetchData('/genres');

    const fakeData: Genres[] = [
        { _id: '1', genreName: 'Hành động', description: 'Phim hành động' },
        { _id: '2', genreName: 'Tình cảm', description: 'Phim tình cảm' },
        { _id: '3', genreName: 'Hài', description: 'Phim hài' }
    ];

    const navigate = useNavigate();

    const handleActionClick = (key: string, record: Genres) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateGenresPage.getPath(record._id));
        } else if (key === 'delete') {
            console.log('Xoá', record);
        }
    };
    const columns: ColumnsType<Genres> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Tên thể loại', dataIndex: 'genreName', key: 'genreName', width: 200 },
        { title: 'Mô tả', dataIndex: 'description', key: 'description', width: 300 },
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
            <h1 className='text-[22px]'>Danh sách thể loại</h1>
            <div className='flex justify-end gap-4 mb-4'>
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => navigate(RouteConfig.CreateGenresPage.path)}
                >
                    Tạo mới
                </Button>
            </div>
            <Table<Genres>
                rowKey={(record) => record._id}
                bordered
                size='small'
                columns={columns}
                dataSource={fakeData}
                scroll={{ x: 800 }}
                pagination={{
                    total: fakeData.length,
                    position: ['bottomRight'],
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} bản ghi`
                }}
            />
        </div>
    );
}
