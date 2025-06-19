import { Breadcrumb, Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { RouteConfig } from '../../../constants';

interface ReviewFormValues {
    comment: string;
    rating?: number;
    reviewDate?: string;
}

interface FormMutationReviewPageProps {
    _id?: string;
}

export default function FormMutationReviewPage({ _id }: FormMutationReviewPageProps) {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ReviewFormValues>({
        defaultValues: { comment: '', rating: undefined, reviewDate: '' }
    });

    useEffect(() => {
        if (_id) {
            reset({ comment: 'Xuất sắc!', rating: 5, reviewDate: '2023-06-01' });
        } else {
            reset({ comment: '', rating: undefined, reviewDate: '' });
        }
    }, [_id, reset]);

    const onSubmit = (values: ReviewFormValues) => {
        if (_id) {
            console.log('Update review:', values);
        } else {
            console.log('Create review:', values);
        }
        navigate(RouteConfig.ListReviewPage.path);
    };

    return (
        <Spin spinning={false}>
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý đánh giá',
                                onClick: () => navigate(RouteConfig.ListReviewPage.path),
                                className: 'cursor-pointer'
                            },
                            { title: _id ? 'Cập nhật đánh giá' : 'Tạo mới đánh giá' }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(RouteConfig.ListReviewPage.path)}>Hủy</Button>
                        <Button type='primary' htmlType='submit' form='review-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                <Form id='review-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <Controller
                        name='comment'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Nội dung' help={errors.comment?.message} required>
                                <Input.TextArea placeholder='Nhập nội dung đánh giá' rows={4} {...field} />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name='rating'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Số sao' help={errors.rating?.message}>
                                <Input type='number' placeholder='1-5' {...field} />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name='reviewDate'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Ngày' help={errors.reviewDate?.message}>
                                <Input placeholder='YYYY-MM-DD' {...field} />
                            </Form.Item>
                        )}
                    />
                </Form>
            </div>
        </Spin>
    );
}
