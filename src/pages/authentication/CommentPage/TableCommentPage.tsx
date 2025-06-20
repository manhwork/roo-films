import Table, { ColumnsType } from 'antd/es/table';
import { Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useFetchData } from '../../../hooks/useFetchData';
import { Comment } from '../../../models/Comment';

export default function TableCommentPage() {
    const { data, error, loading, refetch } = useFetchData('/comments');

    // Mapping dữ liệu từ API về đúng định dạng cho bảng
    const comments: Comment[] = (data?.data || []).map((item: any) => ({
        _id: item.commentid?.toString(),
        userID: item.userid?.toString(),
        contentID: item.contentid?.toString(),
        episodeID: item.episodeid ? item.episodeid.toString() : '',
        parentCommentID: item.parentcommentid ? item.parentcommentid.toString() : '',
        content: item.content,
        commentDate: item.commentdate,
        likeCount: item.likecount,
        username: item.username, // nếu API trả về
        avatar: item.avatar, // nếu API trả về
        contentTitle: item.contenttitle // nếu API trả về
    }));

    const columns: ColumnsType<Comment> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Nội dung', dataIndex: 'content', key: 'content', width: 300 },
        { title: 'Người dùng', dataIndex: 'username', key: 'username', width: 150 },
        { title: 'Ngày', dataIndex: 'commentDate', key: 'commentDate', width: 150 },
        { title: 'Like', dataIndex: 'likeCount', key: 'likeCount', width: 80 },
        { title: 'Phim', dataIndex: 'contentTitle', key: 'contentTitle', width: 200 }
        // Có thể bổ sung thêm các cột khác nếu muốn
    ];

    return (
        <div>
            <h1 className='text-[22px]'>Danh sách bình luận</h1>
            <Table<Comment>
                rowKey={(record) => record._id}
                bordered
                size='small'
                columns={columns}
                dataSource={comments}
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
