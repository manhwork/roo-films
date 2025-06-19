import { Breadcrumb, Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../constants';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';

// Định nghĩa type cho form Actor
interface ActorFormValues {
    name: string;
    originalName?: string;
    bio?: string;
    birthDate?: string;
    nationality?: string;
    photoURL?: string;
}

interface FormMutationActorPageProps {
    _id?: string;
}

export default function FormMutationActorPage({ _id }: FormMutationActorPageProps) {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ActorFormValues>({
        defaultValues: {
            name: '',
            originalName: '',
            bio: '',
            birthDate: '',
            nationality: '',
            photoURL: ''
        }
    });

    // Nếu có _id thì giả lập fetch dữ liệu và reset form (chưa cần API thật)
    useEffect(() => {
        if (_id) {
            // Giả lập dữ liệu actor để update
            const fakeActor: ActorFormValues = {
                name: 'Ngô Thanh Vân',
                originalName: 'Veronica Ngo',
                bio: 'Diễn viên nổi tiếng Việt Nam',
                birthDate: '1979-02-26',
                nationality: 'Việt Nam',
                photoURL: 'https://i.imgur.com/1.jpg'
            };
            reset(fakeActor);
        } else {
            reset({
                name: '',
                originalName: '',
                bio: '',
                birthDate: '',
                nationality: '',
                photoURL: ''
            });
        }
    }, [_id, reset]);

    // Fake submit
    const onSubmit = (values: ActorFormValues) => {
        if (_id) {
            console.log('Update actor:', values);
        } else {
            console.log('Create actor:', values);
        }
        navigate(RouteConfig.ListActorPage.path);
    };

    return (
        <Spin spinning={false}>
            <div>
                {/* Header với Breadcrumb và nút tạo mới */}
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý diễn viên',
                                onClick: () => navigate(RouteConfig.ListActorPage.path),
                                className: 'cursor-pointer'
                            },
                            {
                                title: _id ? 'Cập nhật diễn viên' : 'Tạo mới diễn viên'
                            }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(RouteConfig.ListActorPage.path)}>Hủy</Button>
                        <Button type='primary' htmlType='submit' form='actor-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                {/* Form trong Card */}
                <Form id='actor-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='name'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên diễn viên' help={errors.name?.message} required>
                                    <Input placeholder='Nhập tên diễn viên' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='originalName'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên gốc' help={errors.originalName?.message}>
                                    <Input placeholder='Nhập tên gốc' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='birthDate'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Ngày sinh' help={errors.birthDate?.message}>
                                    <Input placeholder='YYYY-MM-DD' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='nationality'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Quốc tịch' help={errors.nationality?.message}>
                                    <Input placeholder='Nhập quốc tịch' {...field} />
                                </Form.Item>
                            )}
                        />
                    </div>
                    <Controller
                        name='bio'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Tiểu sử' help={errors.bio?.message}>
                                <Input.TextArea placeholder='Nhập tiểu sử' rows={4} {...field} />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name='photoURL'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Ảnh (URL)' help={errors.photoURL?.message}>
                                <Input placeholder='Nhập đường dẫn ảnh' {...field} />
                            </Form.Item>
                        )}
                    />
                </Form>
            </div>
        </Spin>
    );
}
