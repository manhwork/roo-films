import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Content } from '../../../models/Content';
import { Button, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined, ZoomInOutlined } from '@ant-design/icons';
import { RouteConfig } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export default function TableContentPage() {
    const [data, setData] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    const fetchContents = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3000/contents', {
                params: { page, limit }
            });
            setData(
                res.data.data.map((item: any) => ({
                    _id: item.contentid?.toString(),
                    title: item.title,
                    originalTitle: item.originaltitle,
                    description: item.description,
                    type: item.type,
                    releaseDate: item.releasedate,
                    imdbRating: item.imdbrating,
                    posterURL: item.posterurl,
                    backdropURL: item.backdropurl,
                    trailerURL: item.trailerurl,
                    videoURL: item.videourl,
                    duration: item.duration,
                    numberOfSeasons: item.numberofseasons,
                    status: item.status,
                    viewCount: item.viewcount,
                    country: item.country,
                    language: item.language,
                    createdAt: item.createdat,
                    updatedAt: item.updatedat
                }))
            );
            setTotal(res.data.total);
        } catch (err) {
            // handle error
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchContents(page, pageSize);
    }, [page, pageSize]);

    const handleActionClick = async (key: string, record: Content) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateContentPage.getPath(record._id));
        } else if (key === 'delete') {
            await axios.delete(`http://localhost:3000/contents/${record._id}`);
            fetchContents(page, pageSize);
        } else if (key === 'season') {
            navigate(RouteConfig.ListSeasonOfContentPage.getPath(record._id));
        }
    };

    const columns: ColumnsType<Content> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Tên phim', dataIndex: 'title', key: 'title', width: 200 },
        { title: 'Tên gốc', dataIndex: 'originalTitle', key: 'originalTitle', width: 200 },
        { title: 'Loại', dataIndex: 'type', key: 'type', width: 100 },
        { title: 'Ngày phát hành', dataIndex: 'releaseDate', key: 'releaseDate', width: 150 },
        { title: 'IMDB', dataIndex: 'imdbRating', key: 'imdbRating', width: 80 },
        { title: 'Lượt xem', dataIndex: 'viewCount', key: 'viewCount', width: 100 },
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
                            { key: 'delete', label: 'Xoá', icon: <DeleteOutlined /> },
                            record.type === 'tvshow' ? { key: 'season', label: 'Mùa', icon: <ZoomInOutlined /> } : null
                        ].filter(Boolean),
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
            <h1 className='text-[22px]'>Danh sách nội dung</h1>
            <div className='flex justify-end gap-4 mb-4'>
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => navigate(RouteConfig.CreateContentPage.path)}
                >
                    Tạo mới
                </Button>
            </div>
            <Table<Content>
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
