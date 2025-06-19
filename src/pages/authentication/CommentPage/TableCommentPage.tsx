import Table, { ColumnsType } from 'antd/es/table';

import { Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useFetchData } from '../../../hooks/useFetchData';
import { Comment } from '../../../models/Comment';

export default function TableCommentPage() {
    const { data, error, loading, refetch } = useFetchData('/comments');

    const fakeData: Comment[] = [
        {
            _id: '1',
            userID: '1',
            contentID: '1',
            episodeID: '',
            parentCommentID: '',
            content: 'Phim hay quá!',
            commentDate: '2023-06-01',
            likeCount: 10
        },
        {
            _id: '2',
            userID: '2',
            contentID: '1',
            episodeID: '',
            parentCommentID: '',
            content: 'Tôi thích diễn viên chính.',
            commentDate: '2023-06-02',
            likeCount: 5
        },
        {
            _id: '3',
            userID: '3',
            contentID: '2',
            episodeID: '',
            parentCommentID: '',
            content: 'Kịch bản xuất sắc.',
            commentDate: '2023-06-03',
            likeCount: 8
        }
    ];

    const columns: ColumnsType<Comment> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Nội dung', dataIndex: 'content', key: 'content', width: 300 },
        { title: 'Ngày', dataIndex: 'commentDate', key: 'commentDate', width: 150 },
        { title: 'Like', dataIndex: 'likeCount', key: 'likeCount', width: 80 }
        // {
        //     title: 'Hành động',
        //     key: 'action',
        //     fixed: 'right',
        //     width: 80,
        //     align: 'center',
        //     render: (_, record) => (
        //         <Space>
        //             <Button icon={<DeleteOutlined />} size='small'>
        //                 Xoá
        //             </Button>
        //         </Space>
        //     )
        // }
    ];

    return (
        <div>
            <h1 className='text-[22px]'>Danh sách bình luận</h1>
            <Table<Comment>
                rowKey={(record) => record._id}
                bordered
                size='small'
                columns={columns}
                dataSource={fakeData}
                scroll={{ x: 700 }}
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
