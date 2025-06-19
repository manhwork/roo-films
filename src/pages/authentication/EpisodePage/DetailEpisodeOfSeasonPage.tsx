import { useParams } from 'react-router-dom';
import { Card, Descriptions, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../constants';
import { Content } from '../../../models/Content';

const fakeEpisode = {
    _id: '1',
    seasonID: '1',
    episodeNumber: 1,
    title: 'Tập 1',
    description: 'Mở đầu',
    duration: 45,
    videoURL: '',
    thumbnailURL: '',
    releaseDate: '2020-01-01',
    viewCount: 1000,
    createdAt: '',
    updatedAt: ''
};

const fakeData: Content[] = [
    {
        _id: '1',
        title: 'Bố Già',
        originalTitle: 'Bo Gia',
        description: '',
        type: 'movie',
        releaseDate: '2021-03-05',
        imdbRating: 8.1,
        posterURL: '',
        backdropURL: '',
        trailerURL: '',
        videoURL: '',
        duration: 120,
        numberOfSeasons: 0,
        status: 'Completed',
        viewCount: 100000,
        country: 'Việt Nam',
        language: 'Tiếng Việt',
        createdAt: '',
        updatedAt: ''
    },
    {
        _id: '2',
        title: 'Gái Già Lắm Chiêu',
        originalTitle: 'Gai Gia Lam Chieu',
        description: '',
        type: 'movie',
        releaseDate: '2020-02-07',
        imdbRating: 7.5,
        posterURL: '',
        backdropURL: '',
        trailerURL: '',
        videoURL: '',
        duration: 110,
        numberOfSeasons: 0,
        status: 'Completed',
        viewCount: 80000,
        country: 'Việt Nam',
        language: 'Tiếng Việt',
        createdAt: '',
        updatedAt: ''
    },
    {
        _id: '3',
        title: 'Phía Trước Là Bầu Trời',
        originalTitle: 'Phia Truoc La Bau Troi',
        description: '',
        type: 'tvshow',
        releaseDate: '2001-05-01',
        imdbRating: 9.0,
        posterURL: '',
        backdropURL: '',
        trailerURL: '',
        videoURL: '',
        duration: 45,
        numberOfSeasons: 1,
        status: 'Completed',
        viewCount: 50000,
        country: 'Việt Nam',
        language: 'Tiếng Việt',
        createdAt: '',
        updatedAt: ''
    }
];

export default function DetailEpisodeOfSeasonPage() {
    const { contentId, seasonId, episodeId } = useParams();
    const navigate = useNavigate();
    // Lấy tên phim từ fakeData
    const content = fakeData.find((c) => c._id === contentId);
    const contentTitle = content ? content.title : 'Không rõ tên phim';
    // Giả lập số mùa (có thể lấy từ props hoặc fetch thực tế)
    const seasonNumber = 1;
    // Thực tế sẽ fetch theo contentId, seasonId, episodeId
    const episode = fakeEpisode;
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        title: 'Quản lý nội dung',
                        onClick: () => navigate('/contents'),
                        className: 'cursor-pointer'
                    },
                    {
                        title: contentTitle,
                        onClick: () => navigate(RouteConfig.ListSeasonOfContentPage.getPath(String(contentId))),
                        className: 'cursor-pointer'
                    },
                    {
                        title: `Mùa ${seasonNumber}`,
                        onClick: () =>
                            navigate(RouteConfig.ListEpisodeOfSeasonPage.getPath(String(contentId), String(seasonId))),
                        className: 'cursor-pointer'
                    },
                    { title: 'Chi tiết tập' }
                ]}
                className='mb-4'
            />
            <Card title={`Chi tiết tập ${episode.episodeNumber} (Mùa ${seasonNumber}) của phim: ${contentTitle}`}>
                <Descriptions column={1} bordered>
                    <Descriptions.Item label='ID'>{episode._id}</Descriptions.Item>
                    <Descriptions.Item label='Tên tập'>{episode.title}</Descriptions.Item>
                    <Descriptions.Item label='Số tập'>{episode.episodeNumber}</Descriptions.Item>
                    <Descriptions.Item label='Mô tả'>{episode.description}</Descriptions.Item>
                    <Descriptions.Item label='Thời lượng'>{episode.duration} phút</Descriptions.Item>
                    <Descriptions.Item label='Ngày phát hành'>{episode.releaseDate}</Descriptions.Item>
                    <Descriptions.Item label='Lượt xem'>{episode.viewCount}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
}
