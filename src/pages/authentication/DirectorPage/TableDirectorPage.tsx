import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { Director } from '../../../models/Director';
import { Button, Dropdown, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../constants';
import axios from 'axios';

export default function TableDirectorPage() {
    const [data, setData] = useState<Director[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    const fetchDirectors = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3000/directors', {
                params: { page, limit }
            });
            setData(
                res.data.data.map((item: any) => ({
                    _id: item.directorid?.toString(),
                    name: item.name,
                    originalName: item.originalname,
                    bio: item.bio,
                    birthDate: item.birthdate,
                    nationality: item.nationality,
                    photoURL: item.photourl
                }))
            );
            setTotal(res.data.total);
        } catch (err) {
            message.error('Lỗi khi tải danh sách đạo diễn');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDirectors(page, pageSize);
    }, [page, pageSize]);

    const handleActionClick = async (key: string, record: Director) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateDirectorPage.getPath(record._id));
        } else if (key === 'delete') {
            try {
                await axios.delete(`http://localhost:3000/directors/${record._id}`);
                message.success('Xoá thành công');
                fetchDirectors(page, pageSize);
            } catch {
                message.error('Xoá thất bại');
            }
        }
    };

    const columns: ColumnsType<Director> = [
        {
            title: 'STT',
            key: 'key',
            render: (_, __, index) => (page - 1) * pageSize + index + 1,
            align: 'center',
            width: 50
        },
        { title: 'Tên', dataIndex: 'name', key: 'name', width: 200 },
        { title: 'Tên gốc', dataIndex: 'originalName', key: 'originalName', width: 200 },
        { title: 'Ngày sinh', dataIndex: 'birthDate', key: 'birthDate', width: 150 },
        { title: 'Quốc tịch', dataIndex: 'nationality', key: 'nationality', width: 150 },
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
