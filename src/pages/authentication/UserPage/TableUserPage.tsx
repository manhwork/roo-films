import Table, { ColumnsType } from 'antd/es/table';
import { useFetchData } from '../../../hooks/useFetchData';
import { User } from '../../../models/User';
import { Button, Dropdown, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';

export default function TableUserPage() {
    const { data, error, loading, refetch } = useFetchData('/users');

    const fakeData: User[] = [
        {
            _id: '1',
            username: 'admin',
            password: '',
            email: 'admin@gmail.com',
            fullName: 'Quản trị viên',
            avatar: '',
            registerDate: '2023-01-01',
            lastLogin: '',
            isActive: true,
            isAdmin: true
        },
        {
            _id: '2',
            username: 'user1',
            password: '',
            email: 'user1@gmail.com',
            fullName: 'Người dùng 1',
            avatar: '',
            registerDate: '2023-01-02',
            lastLogin: '',
            isActive: true,
            isAdmin: false
        },
        {
            _id: '3',
            username: 'user2',
            password: '',
            email: 'user2@gmail.com',
            fullName: 'Người dùng 2',
            avatar: '',
            registerDate: '2023-01-03',
            lastLogin: '',
            isActive: false,
            isAdmin: false
        }
    ];

    const columns: ColumnsType<User> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Tên đăng nhập', dataIndex: 'username', key: 'username', width: 150 },
        { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName', width: 200 },
        { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 100,
            render: (v) => (v ? 'Hoạt động' : 'Khoá')
        },
        { title: 'Quyền', dataIndex: 'isAdmin', key: 'isAdmin', width: 100, render: (v) => (v ? 'Admin' : 'User') },
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
                        ]
                        // onClick: ({ key }) => handleActionClick(key, record)
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
            <h1 className='text-[22px]'>Danh sách người dùng</h1>
            <div className='flex justify-end gap-4 mb-4'>
                <Button type='primary' icon={<PlusOutlined />}>
                    Tạo mới
                </Button>
            </div>
            <Table<User>
                rowKey={(record) => record._id}
                bordered
                size='small'
                columns={columns}
                dataSource={fakeData}
                scroll={{ x: 900 }}
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
