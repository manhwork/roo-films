import Table, { ColumnsType } from 'antd/es/table';
import { Button, Breadcrumb, Dropdown, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { RouteConfig } from '../../../constants';
import { Episode } from '../../../models/Episode';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListEpisodeOfSeasonPage() {
    const navigate = useNavigate();
    const { contentId, seasonId } = useParams();
    const [data, setData] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchEpisodes = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/seasons/${seasonId}/episodes`);
            setData(
                (res.data || []).map((item: any) => ({
                    _id: item.episodeid?.toString(),
                    seasonID: item.seasonid?.toString(),
                    episodeNumber: item.episodenumber,
                    title: item.title,
                    description: item.description,
                    duration: item.duration,
                    videoURL: item.videourl,
                    thumbnailURL: item.thumbnailurl,
                    releaseDate: item.releasedate,
                    viewCount: item.viewcount,
                    createdAt: item.createdat,
                    updatedAt: item.updatedat
                }))
            );
        } catch {
            message.error('Không thể tải danh sách tập');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (seasonId) fetchEpisodes();
    }, [seasonId]);

    const handleActionClick = async (key: string, record: Episode) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateEpisodeOfSeasonPage.getPath(String(contentId), String(seasonId), record._id));
        } else if (key === 'delete') {
            try {
                await axios.delete(`http://localhost:3000/seasons/${seasonId}/episodes/${record._id}`);
                fetchEpisodes();
                message.success('Đã xoá tập');
            } catch {
                message.error('Xoá thất bại');
            }
        }
    };

    const columns: ColumnsType<Episode> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Tên tập', dataIndex: 'title', key: 'title', width: 200 },
        { title: 'Số tập', dataIndex: 'episodeNumber', key: 'episodeNumber', width: 100 },
        { title: 'Ngày phát hành', dataIndex: 'releaseDate', key: 'releaseDate', width: 150 },
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
            <Breadcrumb
                items={[
                    {
                        title: 'Quản lý nội dung',
                        onClick: () => navigate('/contents'),
                        className: 'cursor-pointer'
                    },
                    {
                        title: 'Danh sách mùa',
                        onClick: () => navigate(RouteConfig.ListSeasonOfContentPage.getPath(String(contentId))),
                        className: 'cursor-pointer'
                    },
                    { title: 'Danh sách tập' }
                ]}
                className='mb-4'
            />
            <h1 className='text-[22px]'>Danh sách tập phim</h1>
            <div className='flex justify-end gap-4 mb-4'>
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() =>
                        navigate(RouteConfig.CreateEpisodeOfSeasonPage.getPath(String(contentId), String(seasonId)))
                    }
                >
                    Thêm tập phim
                </Button>
            </div>
            <Table<Episode>
                rowKey={(record) => record._id}
                bordered
                size='small'
                columns={columns}
                dataSource={data}
                loading={loading}
                scroll={{ x: 800 }}
                pagination={{
                    total: data.length,
                    position: ['bottomRight'],
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} tập`
                }}
            />
        </div>
    );
}
