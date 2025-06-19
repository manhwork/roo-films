import Table, { ColumnsType } from 'antd/es/table';
import { Button, Breadcrumb, Dropdown } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined, ZoomInOutlined, MoreOutlined } from '@ant-design/icons';
import { RouteConfig } from '../../../constants';
import { Episode } from '../../../models/Episode';

const fakeData: Episode[] = [
    {
        _id: '1',
        seasonID: '1',
        episodeNumber: 1,
        title: 'Tập 1',
        description: 'Mở đầu',
        duration: 45,
        videoURL: '',
        thumbnailURL: '',
        releaseDate: '2020-01-01',
        viewCount: 1000,
        createdAt: '',
        updatedAt: ''
    }
];

export default function ListEpisodeOfSeasonPage() {
    const navigate = useNavigate();
    const { contentId, seasonId } = useParams();

    const handleActionClick = (key: string, record: Episode) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateEpisodeOfSeasonPage.getPath(String(contentId), String(seasonId), record._id));
        } else if (key === 'delete') {
            console.log('Xoá', record);
        } else if (key === 'episode') {
            navigate(RouteConfig.DetailEpisodeOfSeasonPage.getPath(String(contentId), String(seasonId), record._id));
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
                            // { key: 'episode', label: 'Tập', icon: <ZoomInOutlined /> }
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
            <h1 className='text-[22px]'>Danh sách tập phim Phía trước là bầu trời mùa 1 </h1>
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
                dataSource={fakeData}
                scroll={{ x: 800 }}
                pagination={{
                    total: fakeData.length,
                    position: ['bottomRight'],
                    showSizeChanger: true,
                    showTotal: (total) => `Tổng ${total} tập`
                }}
            />
        </div>
    );
}
