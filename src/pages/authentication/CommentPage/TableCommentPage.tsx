import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Dropdown, Space } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Comment } from '../../../models/Comment';

export default function TableCommentPage() {
    const [data, setData] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const fetchComments = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:3000/comments', {
                params: { page, limit }
            });
            setData(
                res.data.data.map((item: any) => ({
                    _id: item.commentid?.toString(),
                    userID: item.userid?.toString(),
                    contentID: item.contentid?.toString(),
                    episodeID: item.episodeid ? item.episodeid.toString() : '',
                    parentCommentID: item.parentcommentid ? item.parentcommentid.toString() : '',
                    content: item.content,
                    commentDate: item.commentdate,
                    likeCount: item.likecount,
                    username: item.username,
                    avatar: item.avatar,
                    contentTitle: item.contenttitle
                }))
            );
            setTotal(res.data.total);
        } catch (err) {
            // handle error
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchComments(page, pageSize);
    }, [page, pageSize]);

    const handleActionClick = async (key: string, record: Comment) => {
        if (key === 'edit') {
            // Navigate to edit page if needed
            console.log('Edit comment:', record);
        } else if (key === 'delete') {
            await axios.delete(`http://localhost:3000/comments/${record._id}`);
            fetchComments(page, pageSize);
        }
    };

    const columns: ColumnsType<Comment> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Nội dung', dataIndex: 'content', key: 'content', width: 300 },
        { title: 'Người dùng', dataIndex: 'username', key: 'username', width: 150 },
        { title: 'Ngày', dataIndex: 'commentDate', key: 'commentDate', width: 150 },
        { title: 'Like', dataIndex: 'likeCount', key: 'likeCount', width: 80 },
        { title: 'Phim', dataIndex: 'contentTitle', key: 'contentTitle', width: 200 }
        // {
        //     title: 'Hành động',
        //     key: 'action',
        //     fixed: 'right',
        //     width: 80,
        //     align: 'center',
        //     render: (_, record) => (
        //         <Dropdown
        //             menu={{
        //                 items: [
        //                     { key: 'edit', label: 'Sửa', icon: <EditOutlined /> },
        //                     { key: 'delete', label: 'Xoá', icon: <DeleteOutlined /> }
        //                 ],
        //                 onClick: ({ key }) => handleActionClick(key, record)
        //             }}
        //             trigger={['click']}
        //         >
        //             <Button size='small'>
        //                 <MoreOutlined />
        //             </Button>
        //         </Dropdown>
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
