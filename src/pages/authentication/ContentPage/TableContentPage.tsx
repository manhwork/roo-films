import Table, { ColumnsType } from 'antd/es/table';
import { useFetchData } from '../../../hooks/useFetchData';
import { Content } from '../../../models/Content';
import { Button, Dropdown, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined, ZoomInOutlined } from '@ant-design/icons';
import { RouteConfig } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export default function TableContentPage() {
    const { data, error, loading, refetch } = useFetchData('/contents');

    const fakeData: Content[] = [
        {
            _id: '1',
            title: 'Bố Già',
            originalTitle: 'Bo Gia',
            description: '',
            type: 'movie',
            releaseDate: '2021-03-05',
            imdbRating: 8.1,
            posterURL: '',
            backdropURL: '',
            trailerURL: '',
            videoURL: '',
            duration: 120,
            numberOfSeasons: 0,
            status: 'Completed',
            viewCount: 100000,
            country: 'Việt Nam',
            language: 'Tiếng Việt',
            createdAt: '',
            updatedAt: ''
        },
        {
            _id: '2',
            title: 'Gái Già Lắm Chiêu',
            originalTitle: 'Gai Gia Lam Chieu',
            description: '',
            type: 'movie',
            releaseDate: '2020-02-07',
            imdbRating: 7.5,
            posterURL: '',
            backdropURL: '',
            trailerURL: '',
            videoURL: '',
            duration: 110,
            numberOfSeasons: 0,
            status: 'Completed',
            viewCount: 80000,
            country: 'Việt Nam',
            language: 'Tiếng Việt',
            createdAt: '',
            updatedAt: ''
        },
        {
            _id: '3',
            title: 'Phía Trước Là Bầu Trời',
            originalTitle: 'Phia Truoc La Bau Troi',
            description: '',
            type: 'tvshow',
            releaseDate: '2001-05-01',
            imdbRating: 9.0,
            posterURL: '',
            backdropURL: '',
            trailerURL: '',
            videoURL: '',
            duration: 45,
            numberOfSeasons: 1,
            status: 'Completed',
            viewCount: 50000,
            country: 'Việt Nam',
            language: 'Tiếng Việt',
            createdAt: '',
            updatedAt: ''
        }
    ];

    const navigate = useNavigate();

    const handleActionClick = (key: string, record: Content) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateContentPage.getPath(record._id));
        } else if (key === 'delete') {
            console.log('Xoá', record);
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
