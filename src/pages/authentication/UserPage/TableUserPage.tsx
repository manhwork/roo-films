import Table, { ColumnsType } from 'antd/es/table';
import { useFetchData } from '../../../hooks/useFetchData';
import { User } from '../../../models/User';
import { Button, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../constants';

export default function TableUserPage() {
    const { data, error, loading, refetch } = useFetchData('/users');

    // Mapping dữ liệu từ API về đúng định dạng cho bảng
    const users: User[] = (data?.data || []).map((item: any) => ({
        _id: item.userid?.toString(),
        username: item.username,
        password: '', // không trả về password
        email: item.email,
        fullName: item.fullname,
        avatar: item.avatar,
        registerDate: item.registerdate,
        lastLogin: item.lastlogin,
        isActive: item.isactive,
        isAdmin: item.isadmin
    }));

    const navigate = useNavigate();

    const handleActionClick = (key: string, record: User) => {
        switch (key) {
            case 'edit':
                navigate(RouteConfig.UpdateUserPage.getPath(record._id));
                break;
            case 'delete':
                // Handle delete action
                break;
            default:
                break;
        }
    };

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
                dataSource={users}
                loading={loading}
                scroll={{ x: 900 }}
                pagination={{
                    total: data?.total || 0,
                    position: ['bottomRight'],
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} bản ghi`
                }}
            />
        </div>
    );
}
