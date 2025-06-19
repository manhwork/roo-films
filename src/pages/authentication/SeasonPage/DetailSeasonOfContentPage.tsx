import { useParams } from 'react-router-dom';
import { Card, Descriptions, Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../constants';
import { Content } from '../../../models/Content';

const fakeSeason = {
    _id: '1',
    contentID: '1',
    seasonNumber: 1,
    title: 'Mùa 1',
    posterURL: '',
    releaseDate: '2020-01-01',
    episodeCount: 10,
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

export default function DetailSeasonOfContentPage() {
    const { contentId, seasonId } = useParams();
    const navigate = useNavigate();
    // Lấy tên phim từ fakeData
    const content = fakeData.find((c) => c._id === contentId);
    const contentTitle = content ? content.title : 'Không rõ tên phim';
    // Thực tế sẽ fetch theo contentId, seasonId
    const season = fakeSeason;
    return (
        <>
            <Card title={`Chi tiết mùa ${season.seasonNumber} của phim: ${contentTitle}`}>
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
                            title: `Mùa ${season.seasonNumber}`
                        },
                        { title: 'Chi tiết mùa' }
                    ]}
                    className='mb-4'
                />
                <Descriptions column={1} bordered>
                    <Descriptions.Item label='ID'>{season._id}</Descriptions.Item>
                    <Descriptions.Item label='Tên mùa'>{season.title}</Descriptions.Item>
                    <Descriptions.Item label='Số mùa'>{season.seasonNumber}</Descriptions.Item>
                    <Descriptions.Item label='Ngày phát hành'>{season.releaseDate}</Descriptions.Item>
                    <Descriptions.Item label='Số tập'>{season.episodeCount}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
}
