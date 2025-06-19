import { Breadcrumb, Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { RouteConfig } from '../../../constants';

interface CommentFormValues {
    content: string;
    commentDate?: string;
}

interface FormMutationCommentPageProps {
    _id?: string;
}

export default function FormMutationCommentPage({ _id }: FormMutationCommentPageProps) {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CommentFormValues>({
        defaultValues: { content: '', commentDate: '' }
    });

    useEffect(() => {
        if (_id) {
            reset({ content: 'Phim hay quá!', commentDate: '2023-06-01' });
        } else {
            reset({ content: '', commentDate: '' });
        }
    }, [_id, reset]);

    const onSubmit = (values: CommentFormValues) => {
        if (_id) {
            console.log('Update comment:', values);
        } else {
            console.log('Create comment:', values);
        }
        navigate(RouteConfig.ListCommentPage.path);
    };

    return (
        <Spin spinning={false}>
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý bình luận',
                                onClick: () => navigate(RouteConfig.ListCommentPage.path),
                                className: 'cursor-pointer'
                            },
                            { title: _id ? 'Cập nhật bình luận' : 'Tạo mới bình luận' }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(RouteConfig.ListCommentPage.path)}>Hủy</Button>
                        <Button type='primary' htmlType='submit' form='comment-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                <Form id='comment-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <Controller
                        name='content'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Nội dung' help={errors.content?.message} required>
                                <Input.TextArea placeholder='Nhập nội dung bình luận' rows={4} {...field} />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name='commentDate'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Ngày' help={errors.commentDate?.message}>
                                <Input placeholder='YYYY-MM-DD' {...field} />
                            </Form.Item>
                        )}
                    />
                </Form>
            </div>
        </Spin>
    );
}
