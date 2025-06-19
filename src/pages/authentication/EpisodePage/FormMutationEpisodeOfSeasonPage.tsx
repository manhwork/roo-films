import { Breadcrumb, Button, Form, Input, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { RouteConfig } from '../../../constants';

interface EpisodeFormValues {
    title: string;
    episodeNumber: number;
    description?: string;
    duration?: number;
    videoURL?: string;
    thumbnailURL?: string;
    releaseDate?: string;
    viewCount: number;
}

interface FormMutationEpisodeOfSeasonPageProps {
    _id?: string;
}

export default function FormMutationEpisodeOfSeasonPage({ _id }: FormMutationEpisodeOfSeasonPageProps) {
    const navigate = useNavigate();
    const { contentId, seasonId } = useParams();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<EpisodeFormValues>({
        defaultValues: {
            title: '',
            episodeNumber: 1,
            description: '',
            duration: undefined,
            videoURL: '',
            thumbnailURL: '',
            releaseDate: '',
            viewCount: 0
        }
    });

    useEffect(() => {
        if (_id) {
            reset({
                title: 'Tập 1',
                episodeNumber: 1,
                description: 'Mở đầu',
                duration: 45,
                videoURL: '',
                thumbnailURL: '',
                releaseDate: '2020-01-01',
                viewCount: 1000
            });
        } else {
            reset({
                title: '',
                episodeNumber: 1,
                description: '',
                duration: undefined,
                videoURL: '',
                thumbnailURL: '',
                releaseDate: '',
                viewCount: 0
            });
        }
    }, [_id, reset]);

    const onSubmit = (values: EpisodeFormValues) => {
        if (_id) {
            console.log('Update episode:', values);
        } else {
            console.log('Create episode:', values);
        }
        navigate(RouteConfig.ListEpisodeOfSeasonPage.getPath(String(contentId), String(seasonId)));
    };

    return (
        <Spin spinning={false}>
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý tập phim',
                                onClick: () =>
                                    navigate(
                                        RouteConfig.ListEpisodeOfSeasonPage.getPath(String(contentId), String(seasonId))
                                    ),
                                className: 'cursor-pointer'
                            },
                            { title: _id ? 'Cập nhật tập phim' : 'Tạo mới tập phim' }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button
                            onClick={() =>
                                navigate(
                                    RouteConfig.ListEpisodeOfSeasonPage.getPath(String(contentId), String(seasonId))
                                )
                            }
                        >
                            Hủy
                        </Button>
                        <Button type='primary' htmlType='submit' form='episode-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                <Form id='episode-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên tập' help={errors.title?.message} required>
                                    <Input placeholder='Nhập tên tập' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='episodeNumber'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Số tập' help={errors.episodeNumber?.message} required>
                                    <Input type='number' placeholder='Số tập' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Mô tả' help={errors.description?.message}>
                                    <Input placeholder='Nhập mô tả' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='duration'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Thời lượng (phút)' help={errors.duration?.message}>
                                    <Input type='number' placeholder='Thời lượng' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='videoURL'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Video URL' help={errors.videoURL?.message}>
                                    <Input placeholder='Nhập video URL' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='thumbnailURL'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Thumbnail URL' help={errors.thumbnailURL?.message}>
                                    <Input placeholder='Nhập thumbnail URL' {...field} />
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
                            name='viewCount'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Lượt xem' help={errors.viewCount?.message} required>
                                    <Input type='number' placeholder='Lượt xem' {...field} />
                                </Form.Item>
                            )}
                        />
                    </div>
                </Form>
            </div>
        </Spin>
    );
}
