import Table, { ColumnsType } from 'antd/es/table';
import { useFetchData } from '../../../hooks/useFetchData';
import { Content } from '../../../models/Content';
import { Button, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined, ZoomInOutlined } from '@ant-design/icons';
import { RouteConfig } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export default function TableContentPage() {
    const { data, error, loading, refetch } = useFetchData('/contents');
    const navigate = useNavigate();

    // Mapping dữ liệu từ API về đúng định dạng cho bảng
    const contents: Content[] = (data?.data || []).map((item: any) => ({
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
    }));

    const handleActionClick = (key: string, record: Content) => {
        if (key === 'edit') {
            navigate(RouteConfig.UpdateContentPage.getPath(record._id));
        } else if (key === 'delete') {
            // Gọi API xoá ở đây nếu muốn
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
                dataSource={contents}
                loading={loading}
                scroll={{ x: 1000 }}
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
