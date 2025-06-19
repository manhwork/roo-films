import { Breadcrumb, Button, Form, Input, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { RouteConfig } from '../../../constants';

interface SeasonFormValues {
    title?: string;
    seasonNumber: number;
    posterURL?: string;
    releaseDate?: string;
    episodeCount: number;
}

interface FormMutationSeasonOfContentPageProps {
    _id?: string;
}

export default function FormMutationSeasonOfContentPage({ _id }: FormMutationSeasonOfContentPageProps) {
    const navigate = useNavigate();
    const { contentId } = useParams();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<SeasonFormValues>({
        defaultValues: {
            title: '',
            seasonNumber: 1,
            posterURL: '',
            releaseDate: '',
            episodeCount: 0
        }
    });

    useEffect(() => {
        if (_id) {
            reset({
                title: 'Mùa 1',
                seasonNumber: 1,
                posterURL: '',
                releaseDate: '2020-01-01',
                episodeCount: 10
            });
        } else {
            reset({
                title: '',
                seasonNumber: 1,
                posterURL: '',
                releaseDate: '',
                episodeCount: 0
            });
        }
    }, [_id, reset]);

    const onSubmit = (values: SeasonFormValues) => {
        if (_id) {
            console.log('Update season:', values);
        } else {
            console.log('Create season:', values);
        }
        navigate(RouteConfig.ListSeasonOfContentPage.getPath(String(contentId)));
    };

    return (
        <Spin spinning={false}>
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý mùa',
                                onClick: () => navigate(RouteConfig.ListSeasonOfContentPage.getPath(String(contentId))),
                                className: 'cursor-pointer'
                            },
                            { title: _id ? 'Cập nhật mùa' : 'Tạo mới mùa' }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button
                            onClick={() => navigate(RouteConfig.ListSeasonOfContentPage.getPath(String(contentId)))}
                        >
                            Hủy
                        </Button>
                        <Button type='primary' htmlType='submit' form='season-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                <Form id='season-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên mùa' help={errors.title?.message} required>
                                    <Input placeholder='Nhập tên mùa' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='seasonNumber'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Số mùa' help={errors.seasonNumber?.message} required>
                                    <Input type='number' placeholder='Số mùa' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='posterURL'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Poster URL' help={errors.posterURL?.message}>
                                    <Input placeholder='Nhập poster URL' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='releaseDate'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Ngày phát hành' help={errors.releaseDate?.message}>
                                    <Input placeholder='YYYY-MM-DD' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='episodeCount'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Số tập' help={errors.episodeCount?.message} required>
                                    <Input type='number' placeholder='Số tập' {...field} />
                                </Form.Item>
                            )}
                        />
                    </div>
                </Form>
            </div>
        </Spin>
    );
}
