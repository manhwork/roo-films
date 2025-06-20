import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Genres } from '../../../models/Genres';
import { Button, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { RouteConfig } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export default function TableGenresPage() {
    const [data, setData] = useState<Genres[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    const fetchGenres = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3000/genres', {
                params: { page, limit }
            });
            setData(
                res.data.data.map((item: any) => ({
                    _id: item.genreid?.toString(),
                    genreName: item.genrename,
                    description: item.description
                }))
            );
            setTotal(res.data.total);
        } catch (err) {
            // handle error
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchGenres(page, pageSize);
    }, [page, pageSize]);

    const handleActionClick = async (key: string, record: Genres) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateGenresPage.getPath(record._id));
        } else if (key === 'delete') {
            await axios.delete(`http://localhost:3000/genres/${record._id}`);
            fetchGenres(page, pageSize);
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
                dataSource={data}
                loading={loading}
                scroll={{ x: 800 }}
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
