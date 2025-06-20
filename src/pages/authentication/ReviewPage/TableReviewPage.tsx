import Table, { ColumnsType } from 'antd/es/table';
import { useFetchData } from '../../../hooks/useFetchData';
import { Review } from '../../../models/Review';
import { Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function TableReviewPage() {
    const { data, error, loading, refetch } = useFetchData('/reviews');

    // Mapping dữ liệu từ API về đúng định dạng cho bảng
    const reviews: Review[] = (data?.data || []).map((item: any) => ({
        _id: item.reviewid?.toString(),
        userID: item.userid?.toString(),
        contentID: item.contentid?.toString(),
        rating: item.rating,
        comment: item.comment,
        reviewDate: item.reviewdate,
        likeCount: item.likecount,
        username: item.username, // nếu API trả về
        avatar: item.avatar, // nếu API trả về
        contentTitle: item.contenttitle // nếu API trả về
    }));

    const columns: ColumnsType<Review> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Nội dung', dataIndex: 'comment', key: 'comment', width: 300 },
        { title: 'Số sao', dataIndex: 'rating', key: 'rating', width: 80 },
        { title: 'Người dùng', dataIndex: 'username', key: 'username', width: 150 },
        { title: 'Phim', dataIndex: 'contentTitle', key: 'contentTitle', width: 200 },
        { title: 'Ngày', dataIndex: 'reviewDate', key: 'reviewDate', width: 150 },
        { title: 'Like', dataIndex: 'likeCount', key: 'likeCount', width: 80 }
    ];

    return (
        <div>
            <h1 className='text-[22px]'>Danh sách đánh giá</h1>
            <Table<Review>
                rowKey={(record) => record._id}
                bordered
                size='small'
                columns={columns}
                dataSource={reviews}
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
