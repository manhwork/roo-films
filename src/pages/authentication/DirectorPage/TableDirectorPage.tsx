import Table, { ColumnsType } from 'antd/es/table';
import { useFetchData } from '../../../hooks/useFetchData';
import { Director } from '../../../models/Director';
import { Button, Space, Image, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../constants';

export default function TableDirectorPage() {
    const { data, error, loading, refetch } = useFetchData('/directors');

    const fakeData: Director[] = [
        {
            _id: '1',
            name: 'Victor Vũ',
            originalName: 'Victor Vu',
            bio: '',
            birthDate: '1975-11-25',
            nationality: 'Việt Nam',
            photoURL: 'https://i.imgur.com/4.jpg'
        },
        {
            _id: '2',
            name: 'Charlie Nguyễn',
            originalName: 'Charlie Nguyen',
            bio: '',
            birthDate: '1968-09-25',
            nationality: 'Việt Nam',
            photoURL: 'https://i.imgur.com/5.jpg'
        },
        {
            _id: '3',
            name: 'Nguyễn Quang Dũng',
            originalName: 'Nguyen Quang Dung',
            bio: '',
            birthDate: '1978-08-08',
            nationality: 'Việt Nam',
            photoURL: 'https://i.imgur.com/6.jpg'
        }
    ];

    const navigate = useNavigate();
    const handleActionClick = (key: string, record: Director) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateDirectorPage.getPath(record._id));
        } else if (key === 'delete') {
            console.log('Xoá', record);
        }
    };

    const columns: ColumnsType<Director> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Tên', dataIndex: 'name', key: 'name', width: 200 },
        { title: 'Tên gốc', dataIndex: 'originalName', key: 'originalName', width: 200 },
        { title: 'Ngày sinh', dataIndex: 'birthDate', key: 'birthDate', width: 150 },
        { title: 'Quốc tịch', dataIndex: 'nationality', key: 'nationality', width: 150 },
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
            <h1 className='text-[22px]'>Danh sách đạo diễn</h1>
            <div className='flex justify-end gap-4 mb-4'>
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => navigate(RouteConfig.CreateDirectorPage.path)}
                >
                    Tạo mới
                </Button>
            </div>
            <Table<Director>
                rowKey={(record) => record._id}
                bordered
                size='small'
                columns={columns}
                dataSource={fakeData}
                scroll={{ x: 1000 }}
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
