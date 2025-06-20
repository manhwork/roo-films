import Table, { ColumnsType } from 'antd/es/table';
import { Button, Breadcrumb, Dropdown, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined, ZoomInOutlined, MoreOutlined } from '@ant-design/icons';
import { RouteConfig } from '../../../constants';
import { Season } from '../../../models/Season';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListSeasonOfContentPage() {
    const navigate = useNavigate();
    const { contentId } = useParams();
    const [data, setData] = useState<Season[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSeasons = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/contents/${contentId}/seasons`);
            setData(
                (res.data || []).map((item: any) => ({
                    _id: item.seasonid?.toString(),
                    contentID: item.contentid?.toString(),
                    seasonNumber: item.seasonnumber,
                    title: item.title,
                    posterURL: item.posterurl,
                    releaseDate: item.releasedate,
                    episodeCount: item.episodecount,
                    createdAt: item.createdat,
                    updatedAt: item.updatedat
                }))
            );
        } catch {
            message.error('Không thể tải danh sách mùa');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (contentId) fetchSeasons();
    }, [contentId]);

    const handleActionClick = async (key: string, record: Season) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateSeasonOfContentPage.getPath(String(contentId), record._id));
        } else if (key === 'delete') {
            try {
                await axios.delete(`http://localhost:3000/contents/${contentId}/seasons/${record._id}`);
                fetchSeasons();
                message.success('Đã xoá mùa');
            } catch {
                message.error('Xoá thất bại');
            }
        } else if (key === 'episode') {
            navigate(RouteConfig.ListEpisodeOfSeasonPage.getPath(String(contentId), record._id));
        }
    };

    const columns: ColumnsType<Season> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Tên mùa', dataIndex: 'title', key: 'title', width: 200 },
        { title: 'Số mùa', dataIndex: 'seasonNumber', key: 'seasonNumber', width: 100 },
        { title: 'Ngày phát hành', dataIndex: 'releaseDate', key: 'releaseDate', width: 150 },
        { title: 'Số tập', dataIndex: 'episodeCount', key: 'episodeCount', width: 100 },
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
                            { key: 'episode', label: 'Tập', icon: <ZoomInOutlined /> }
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
                    { title: 'Danh sách mùa' }
                ]}
                className='mb-4'
            />
            <h1 className='text-[22px]'>Danh sách mùa</h1>
            <div className='flex justify-end gap-4 mb-4'>
                <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => navigate(RouteConfig.CreateSeasonOfContentPage.getPath(String(contentId)))}
                >
                    Thêm mùa
                </Button>
            </div>
            <Table<Season>
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
                    showTotal: (total) => `Tổng ${total} mùa`
                }}
            />
        </div>
    );
}
