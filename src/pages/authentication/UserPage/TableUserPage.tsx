import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../../../models/User';
import { Button, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../constants';

export default function TableUserPage() {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    const fetchUsers = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3000/users', {
                params: { page, limit }
            });
            setData(
                res.data.data.map((item: any) => ({
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
                }))
            );
            setTotal(res.data.total);
        } catch (err) {
            // handle error
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(page, pageSize);
    }, [page, pageSize]);

    const handleActionClick = async (key: string, record: User) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateUserPage.getPath(record._id.toString()));
        } else if (key === 'delete') {
            await axios.delete(`http://localhost:3000/users/${record._id}`);
            fetchUsers(page, pageSize);
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
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => navigate(RouteConfig.CreateUserPage.path)}
                >
                    Tạo mới
                </Button>
            </div>
            <Table<User>
                rowKey={(record) => record._id}
                bordered
                size='small'
                columns={columns}
                dataSource={data}
                loading={loading}
                scroll={{ x: 1000 }}
                pagination={{
                    total,
                    current: page,
                    pageSize,
                    onChange: (p, ps) => {
                        setPage(p);
                        setPageSize(ps);
                    },
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} bản ghi`
                }}
            />
        </div>
    );
}
