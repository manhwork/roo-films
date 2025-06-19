import Table, { ColumnsType } from 'antd/es/table';
import { useFetchData } from '../../../hooks/useFetchData';
import { Review } from '../../../models/Review';
import { Button, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export default function TableReviewPage() {
    const { data, error, loading, refetch } = useFetchData('/reviews');

    const fakeData: Review[] = [
        {
            _id: '1',
            userID: '1',
            contentID: '1',
            rating: 5,
            comment: 'Xuất sắc!',
            reviewDate: '2023-06-01',
            likeCount: 12
        },
        {
            _id: '2',
            userID: '2',
            contentID: '2',
            rating: 4,
            comment: 'Rất hay',
            reviewDate: '2023-06-02',
            likeCount: 7
        },
        { _id: '3', userID: '3', contentID: '1', rating: 3, comment: 'Tạm ổn', reviewDate: '2023-06-03', likeCount: 3 }
    ];

    const columns: ColumnsType<Review> = [
        { title: 'STT', key: 'key', render: (_, __, index) => index + 1, align: 'center', width: 50 },
        { title: 'Nội dung', dataIndex: 'comment', key: 'comment', width: 300 },
        { title: 'Số sao', dataIndex: 'rating', key: 'rating', width: 80 },
        { title: 'Ngày', dataIndex: 'reviewDate', key: 'reviewDate', width: 150 },
        { title: 'Like', dataIndex: 'likeCount', key: 'likeCount', width: 80 },
        {
            title: 'Hành động',
            key: 'action',
            fixed: 'right',
            width: 80,
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Button icon={<DeleteOutlined />} size='small'>
                        Xoá
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <h1 className='text-[22px]'>Danh sách đánh giá</h1>
            <Table<Review>
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
