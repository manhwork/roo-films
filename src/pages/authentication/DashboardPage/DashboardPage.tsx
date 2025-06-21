import { Button, Col, ColProps, Row } from 'antd';
import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { io, Socket } from 'socket.io-client';
import AvgWatchtimeUserBarChart from './components/avg-watchtime-user-bar-chart';
import CardList from './components/card-list';
import DeviceDistributionPieChart from './components/device-distribution-pie-chart';
import EngagementTimelineStackedLineChart from './components/engagement-timeline-stacked-line-chart';
import EngagementTypePieChart from './components/engagement-type-pie-chart';
import Last30DaysViewsLineChart from './components/last-30-days-views-line-chart';
import MonthlyViewsBarChart from './components/monthly-views-bar-chart';
import PopularBrowsersBarChart from './components/popular-browsers-bar-chart';
import RatingBarChart from './components/rating-bar-chart';
import RatingDistributionHistogram from './components/rating-distribution-histogram';
import TopCountriesBarChart from './components/top-countries-bar-chart';
import TopMoviesLikesBarChart from './components/top-movies-likes-bar-chart';
import TopMoviesRatingBarChart from './components/top-movies-rating-bar-chart';
import TopMoviesViewsBarChart from './components/top-movies-views-bar-chart';
import TopUsersBarChart from './components/top-users-bar-chart';
import UserActivityHeatmap from './components/user-activity-heatmap';
import UserLocationMapChart from './components/user-location-map-chart';
import ViewsByGenrePieChart from './components/views-by-genre-pie-chart';
import ViewsByPeriodCharts from './components/views-by-period-charts';

const wrapperCol: ColProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    xxl: 12
};

// Hàm fetch dữ liệu mẫu (bạn thay bằng API thực tế)
async function fetchReportData() {
    const [
        monthlyViewsRes,
        last30DaysViewsRes,
        topMoviesRes,
        topRatedMoviesRes,
        topLikedMoviesRes,
        genreViewsRes,
        ratingStatsRes,
        topUsersRes,
        avgWatchtimeRes,
        engagementTypeRes,
        deviceTypeRes,
        browsersRes,
        timelineRes,
        heatmapRes,
        topCountriesRes,
        userLocationRes,
        summaryContentsRes,
        summaryUsersRes,
        summaryViewsRes,
        ratingMonthRes,
        viewsYearRes,
        viewsSeasonRes
    ] = await Promise.all([
        fetch('http://localhost:3000/dw/views/month').then((r) => r.json()),
        fetch('http://localhost:3000/dw/views/day').then((r) => r.json()),
        fetch('http://localhost:3000/dw/top-content/views').then((r) => r.json()),
        fetch('http://localhost:3000/dw/top-content/rating').then((r) => r.json()),
        fetch('http://localhost:3000/dw/top-content/likes').then((r) => r.json()),
        fetch('http://localhost:3000/dw/views/genre').then((r) => r.json()),
        fetch('http://localhost:3000/dw/ratings/distribution').then((r) => r.json()),
        fetch('http://localhost:3000/dw/top-users').then((r) => r.json()),
        fetch('http://localhost:3000/dw/avg-watchtime-user').then((r) => r.json()),
        fetch('http://localhost:3000/dw/engagement/type').then((r) => r.json()),
        fetch('http://localhost:3000/dw/device/distribution').then((r) => r.json()),
        fetch('http://localhost:3000/dw/popular-browsers').then((r) => r.json()),
        fetch('http://localhost:3000/dw/engagement/timeline').then((r) => r.json()),
        fetch('http://localhost:3000/dw/user/activity-heatmap').then((r) => r.json()),
        fetch('http://localhost:3000/dw/top-countries').then((r) => r.json()),
        fetch('http://localhost:3000/dw/user/location').then((r) => r.json()),
        fetch('http://localhost:3000/dw/summary/contents').then((r) => r.json()),
        fetch('http://localhost:3000/dw/summary/users').then((r) => r.json()),
        fetch('http://localhost:3000/dw/summary/views').then((r) => r.json()),
        fetch('http://localhost:3000/dw/ratings/month').then((r) => r.json()),
        fetch('http://localhost:3000/dw/views/year').then((r) => r.json()),
        fetch('http://localhost:3000/dw/views/season').then((r) => r.json())
    ]);

    return {
        monthlyViews: monthlyViewsRes,
        last30DaysViews: last30DaysViewsRes,
        topMovies: topMoviesRes,
        topRatedMovies: topRatedMoviesRes,
        topLikedMovies: topLikedMoviesRes,
        genreViews: genreViewsRes,
        ratingStats: ratingStatsRes,
        topUsers: topUsersRes,
        avgWatchtime: avgWatchtimeRes,
        engagementType: engagementTypeRes,
        deviceType: deviceTypeRes,
        browsers: browsersRes,
        timeline: timelineRes,
        heatmap: heatmapRes,
        topCountries: topCountriesRes,
        userLocation: userLocationRes,
        summary: {
            totalMovies: summaryContentsRes.totalMovies,
            totalUsers: summaryUsersRes.totalUsers,
            totalViews: summaryViewsRes.totalViews
        },
        ratingMonth: ratingMonthRes,
        viewsYear: viewsYearRes,
        viewsSeason: viewsSeasonRes
    };
}

interface DashboardReportData {
    monthlyViews?: Array<{ month: number; year: number; views: number }>;
    last30DaysViews?: Array<{ date: string; views: number }>;
    topMovies?: Array<{ title: string; views: number }>;
    topRatedMovies?: Array<{ title: string; rating: number }>;
    topLikedMovies?: Array<{ title: string; likes: number }>;
    genreViews?: Array<{ genrename: string; views: number }>;
    ratingStats?: Array<{ rating_bin: number; count: number }>;
    topUsers?: Array<{ username: string; views: number }>;
    avgWatchtime?: Array<{ username: string; avg_minutes: number }>;
    engagementType?: Array<{ engagementtype: string; count: number }>;
    deviceType?: Array<{ devicetype: string; count: number }>;
    browsers?: Array<{ browser: string; count: number }>;
    timeline?: Array<{ date: string; likes: number; comments: number; reviews: number }>;
    heatmap?: Array<{ dayname: string; hour: number; activity: number }>;
    topCountries?: Array<{ country: string; views: number }>;
    userLocation?: Array<{ city: string; user_count: number }>;
    summary?: {
        totalMovies: number;
        totalUsers: number;
        totalViews: number;
    };
    ratingMonth?: Array<{ month: number; year: number; avg_rating: number }>;
    viewsYear?: Array<{ year: number; views: number }>;
    viewsSeason?: Array<{ season: number; year: number; views: number }>;
}

function DashboardReportTemplate({
    data,
    fromDate,
    toDate,
    onChartRendered
}: {
    data: DashboardReportData;
    fromDate: string;
    toDate: string;
    onChartRendered?: () => void;
}) {
    // Chuẩn hóa dữ liệu cho bảng tháng
    const monthArr = Array(12).fill(0);
    data.monthlyViews?.forEach((item) => {
        if (item.month >= 1 && item.month <= 12) monthArr[item.month - 1] = item.views;
    });

    // Chuẩn hóa dữ liệu cho bảng 30 ngày
    const last30Arr = Array(30).fill(0);
    data.last30DaysViews?.forEach((item, idx) => {
        if (idx < 30) last30Arr[idx] = item.views;
    });

    const tableStyle: React.CSSProperties = {
        borderCollapse: 'collapse',
        margin: '12px 0',
        width: '100%',
        border: '1px solid #ccc'
    };
    const thStyle: React.CSSProperties = { background: '#f2f2f2', padding: '8px', border: '1px solid #ccc' };
    const tdStyle: React.CSSProperties = { padding: '8px', border: '1px solid #ccc', textAlign: 'center' };
    const chartContainerStyle: React.CSSProperties = {
        marginTop: '20px',
        marginBottom: '40px',
        pageBreakInside: 'avoid'
    };
    const sectionStyle: React.CSSProperties = { pageBreakInside: 'avoid' };

    return (
        <div style={{ padding: 32, background: '#fff', color: '#222', width: 1000, fontFamily: 'Arial, sans-serif' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>BÁO CÁO HOẠT ĐỘNG CỦA TRANG WEB</h1>
                <p>
                    Từ ngày <b>{fromDate}</b> đến ngày <b>{toDate}</b>
                </p>
            </header>

            <section style={sectionStyle}>
                <h2>Phân loại thống kê</h2>
                <h3>I. Thống kê theo phim, nội dung</h3>

                <h4>1. Tổng lượt xem theo tháng</h4>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Tháng</th>
                            {[...Array(12)].map((_, i) => (
                                <th style={thStyle} key={i}>
                                    {i + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={tdStyle}>Tổng số lượt xem</td>
                            {monthArr.map((v, i) => (
                                <td style={tdStyle} key={i}>
                                    {v}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div style={chartContainerStyle}>
                    <MonthlyViewsBarChart onRendered={onChartRendered} />
                </div>

                <h4>2. Lượt xem trong 30 ngày gần nhất</h4>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            {Array.from({ length: 15 }, (_, i) => (
                                <th style={thStyle} key={i}>
                                    Ngày {i + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {last30Arr.slice(0, 15).map((v, i) => (
                                <td style={tdStyle} key={i}>
                                    {v}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            {Array.from({ length: 15 }, (_, i) => (
                                <th style={thStyle} key={i}>
                                    Ngày {i + 16}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {last30Arr.slice(15, 30).map((v, i) => (
                                <td style={tdStyle} key={i}>
                                    {v}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div style={chartContainerStyle}>
                    <Last30DaysViewsLineChart onRendered={onChartRendered} />
                </div>

                <h4>3. Top 10 phim được xem nhiều nhất</h4>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Tên phim</th>
                            <th style={thStyle}>Lượt xem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.topMovies?.slice(0, 10).map((m, idx) => (
                            <tr key={m.title}>
                                <td style={tdStyle}>{idx + 1}</td>
                                <td style={{ ...tdStyle, textAlign: 'left' }}>{m.title}</td>
                                <td style={tdStyle}>{m.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={chartContainerStyle}>
                    <TopMoviesViewsBarChart onRendered={onChartRendered} />
                </div>

                <h4>4. Top 10 phim có điểm đánh giá cao nhất</h4>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Tên phim</th>
                            <th style={thStyle}>Điểm đánh giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.topRatedMovies?.slice(0, 10).map((m, idx) => (
                            <tr key={m.title}>
                                <td style={tdStyle}>{idx + 1}</td>
                                <td style={{ ...tdStyle, textAlign: 'left' }}>{m.title}</td>
                                <td style={tdStyle}>{m.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={chartContainerStyle}>
                    <TopMoviesRatingBarChart onRendered={onChartRendered} />
                </div>

                <h4>5. Top 10 phim có lượt thích nhiều nhất</h4>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Tên phim</th>
                            <th style={thStyle}>Lượt thích</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.topLikedMovies?.slice(0, 10).map((m, idx) => (
                            <tr key={m.title}>
                                <td style={tdStyle}>{idx + 1}</td>
                                <td style={{ ...tdStyle, textAlign: 'left' }}>{m.title}</td>
                                <td style={tdStyle}>{m.likes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={chartContainerStyle}>
                    <TopMoviesLikesBarChart onRendered={onChartRendered} />
                </div>

                <h4>6. Thống kê lượt xem theo thể loại</h4>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Thể loại</th>
                            <th style={thStyle}>Lượt xem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.genreViews?.map((g) => (
                            <tr key={g.genrename}>
                                <td style={tdStyle}>{g.genrename}</td>
                                <td style={tdStyle}>{g.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={chartContainerStyle}>
                    <ViewsByGenrePieChart onRendered={onChartRendered} />
                </div>

                <h4>7. Phổ điểm đánh giá phim</h4>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Điểm</th>
                            <th style={thStyle}>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.ratingStats?.map((r) => (
                            <tr key={r.rating_bin}>
                                <td style={tdStyle}>{r.rating_bin}</td>
                                <td style={tdStyle}>{r.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={chartContainerStyle}>
                    <RatingDistributionHistogram onRendered={onChartRendered} />
                </div>

                <h4>8. Điểm đánh giá trung bình theo tháng</h4>
                <div style={chartContainerStyle}>
                    <RatingBarChart onRendered={onChartRendered} />
                </div>

                <h4>9. Lượt xem theo thời gian (năm, mùa, tháng, ngày)</h4>
                <div style={chartContainerStyle}>
                    <ViewsByPeriodCharts onRendered={onChartRendered} />
                </div>
            </section>

            <section style={sectionStyle}>
                <h3>II. Thống kê theo người dùng</h3>
                <h4>1. Top người dùng hoạt động</h4>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Tên người dùng</th>
                            <th style={thStyle}>Lượt xem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.topUsers?.slice(0, 10).map((u, idx) => (
                            <tr key={u.username}>
                                <td style={tdStyle}>{idx + 1}</td>
                                <td style={{ ...tdStyle, textAlign: 'left' }}>{u.username}</td>
                                <td style={tdStyle}>{u.views}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={chartContainerStyle}>
                    <TopUsersBarChart onRendered={onChartRendered} />
                </div>

                <h4>2. Thời gian xem trung bình của người dùng</h4>
                <table cellPadding={4} style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>STT</th>
                            <th style={thStyle}>Tên người dùng</th>
                            <th style={thStyle}>Thời gian xem trung bình (phút)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.avgWatchtime?.slice(0, 10).map((u, idx) => (
                            <tr key={u.username}>
                                <td style={tdStyle}>{idx + 1}</td>
                                <td style={{ ...tdStyle, textAlign: 'left' }}>{u.username}</td>
                                <td style={tdStyle}>{u.avg_minutes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={chartContainerStyle}>
                    <AvgWatchtimeUserBarChart onRendered={onChartRendered} />
                </div>

                <h4>3. Heatmap hoạt động người dùng</h4>
                {/* <div style={chartContainerStyle}>
                    <UserActivityHeatmap onRendered={onChartRendered} />
                </div> */}
            </section>

            <section style={sectionStyle}>
                <h3>III. Thống kê thiết bị, trình duyệt, vị trí</h3>
                <h4>1. Tỷ lệ loại thiết bị truy cập</h4>
                <div style={chartContainerStyle}>
                    <DeviceDistributionPieChart onRendered={onChartRendered} />
                </div>

                <h4>2. Trình duyệt phổ biến</h4>
                <div style={chartContainerStyle}>
                    <PopularBrowsersBarChart onRendered={onChartRendered} />
                </div>

                <h4>3. Phân bố người dùng theo tỉnh thành</h4>
                <div style={chartContainerStyle}>
                    {' '}
                    <UserLocationMapChart onRendered={onChartRendered} />{' '}
                </div>

                <h4>4. Top quốc gia có lượt xem nhiều nhất</h4>
                <div style={chartContainerStyle}>
                    {' '}
                    <TopCountriesBarChart onRendered={onChartRendered} />{' '}
                </div>
            </section>

            <section style={sectionStyle}>
                <h3>IV. Thống kê tương tác</h3>
                <h4>1. Tỷ lệ loại tương tác</h4>
                <div style={chartContainerStyle}>
                    {' '}
                    <EngagementTypePieChart onRendered={onChartRendered} />{' '}
                </div>

                <h4>2. Timeline tương tác người dùng</h4>
                <div style={chartContainerStyle}>
                    <EngagementTimelineStackedLineChart onRendered={onChartRendered} />
                </div>
            </section>
        </div>
    );
}

const TOTAL_CHARTS = 17; // Số lượng chart thực tế bạn dùng

// Dashboard Context để chia sẻ dữ liệu realtime
const DashboardContext = createContext<{
    data: DashboardReportData | null;
    isConnected: boolean;
    lastUpdate: Date | null;
}>({
    data: null,
    isConnected: false,
    lastUpdate: null
});

export const useDashboardData = () => useContext(DashboardContext);

export const DashboardPage = () => {
    const reportRef = useRef<HTMLDivElement>(null);
    const [reportData, setReportData] = useState<any>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [chartsRendered, setChartsRendered] = useState(0);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    // Lấy ngày đầu/tháng và cuối/tháng (bạn có thể lấy động)
    const fromDate = '01/06/2024';
    const toDate = '30/06/2024';

    // Khởi tạo Socket.IO connection
    useEffect(() => {
        const newSocket = io('http://localhost:3000', {
            transports: ['websocket', 'polling']
        });

        newSocket.on('connect', () => {
            console.log('Connected to Socket.IO server');
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
            setIsConnected(false);
        });

        newSocket.on('dashboard:update', (data: DashboardReportData) => {
            console.log('Received realtime dashboard update:', data);
            setReportData(data);
            setLastUpdate(new Date());
        });

        setSocket(newSocket);

        // Cleanup khi component unmount
        return () => {
            newSocket.close();
        };
    }, []);

    // Tự động gọi dashboard:request-update mỗi 5 giây khi đã kết nối
    useEffect(() => {
        if (!isConnected || !socket) return;

        const interval = setInterval(() => {
            console.log('Auto requesting dashboard update...');
            socket.emit('dashboard:request-update');
        }, 5000); // 5 giây

        return () => {
            clearInterval(interval);
        };
    }, [isConnected, socket]);

    // Fallback: fetch dữ liệu ban đầu nếu không có socket
    useEffect(() => {
        if (!isConnected && !reportData) {
            fetchReportData().then(setReportData);
        }
    }, [isConnected, reportData]);

    // Callback cho mỗi chart khi render xong
    const handleChartRendered = () => setChartsRendered((prev) => prev + 1);

    // Reset khi load lại báo cáo
    useEffect(() => {
        setChartsRendered(0);
    }, [reportData]);

    const handleStartExport = () => setIsExporting(true);

    // Hàm request update từ server
    const handleRequestUpdate = () => {
        if (socket && isConnected) {
            socket.emit('dashboard:request-update');
        }
    };

    useEffect(() => {
        if (isExporting) {
            const exportPDF = async () => {
                const element = reportRef.current;
                if (!element) {
                    setIsExporting(false);
                    return;
                }
                await new Promise((resolve) => setTimeout(resolve, 5000));

                const canvas = await html2canvas(element, {
                    useCORS: true,
                    scale: 2,
                    logging: true, // Bật log để debug
                    width: element.scrollWidth,
                    height: element.scrollHeight
                });
                const imgData = canvas.toDataURL('image/png', 1.0);
                const pdf = new jsPDF({
                    orientation: 'p', // Portrait mode
                    unit: 'px',
                    format: 'a4' // Standard A4 size
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const canvasAspectRatio = canvasWidth / canvasHeight;
                const pdfAspectRatio = pdfWidth / pdfHeight;

                let finalCanvasWidth, finalCanvasHeight;

                // Fit to width
                finalCanvasWidth = pdfWidth;
                finalCanvasHeight = finalCanvasWidth / canvasAspectRatio;

                const totalPages = Math.ceil(finalCanvasHeight / pdfHeight);

                for (let i = 0; i < totalPages; i++) {
                    if (i > 0) {
                        pdf.addPage();
                    }
                    const yPos = -(pdfHeight * i);
                    pdf.addImage(imgData, 'PNG', 0, yPos, finalCanvasWidth, finalCanvasHeight);
                }

                pdf.save(`BaoCao_HoatDong_TrangWeb_Full_${Date.now()}.pdf`);
                setIsExporting(false); // Kết thúc chế độ xuất
            };

            exportPDF();
        }
    }, [isExporting]);

    return (
        <DashboardContext.Provider value={{ data: reportData, isConnected, lastUpdate }}>
            <div className='flex justify-between items-center gap-4 mb-4'>
                <div className='flex items-center gap-4'>
                    <div className={`flex items-center gap-2 ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className='text-sm font-medium'>
                            {isConnected ? 'Đang kết nối realtime' : 'Mất kết nối realtime'}
                        </span>
                    </div>
                    {lastUpdate && (
                        <span className='text-sm text-gray-500'>
                            Cập nhật lần cuối: {lastUpdate.toLocaleTimeString('vi-VN')}
                        </span>
                    )}
                </div>
                <div className='flex gap-4'>
                    <Button type='default' onClick={handleRequestUpdate} disabled={!isConnected} className='p-4'>
                        Làm mới dữ liệu
                    </Button>
                    <Button
                        type='dashed'
                        className='p-4 text-right'
                        onClick={handleStartExport}
                        disabled={!reportData || isExporting}
                    >
                        {isExporting ? 'Đang xuất...' : !reportData ? 'Đang tải dữ liệu...' : 'Xuất báo cáo'}
                    </Button>
                </div>
            </div>
            {/* Dashboard hiển thị bình thường */}
            <div>
                <CardList />
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col {...wrapperCol}>
                        <MonthlyViewsBarChart />
                    </Col>
                    <Col {...wrapperCol}>
                        <Last30DaysViewsLineChart />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col {...wrapperCol}>
                        <TopUsersBarChart />
                    </Col>
                    <Col {...wrapperCol}>
                        <AvgWatchtimeUserBarChart />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col {...wrapperCol}>
                        <TopMoviesViewsBarChart />
                    </Col>
                    <Col {...wrapperCol}>
                        <TopMoviesRatingBarChart />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col {...wrapperCol}>
                        <ViewsByGenrePieChart />
                    </Col>
                    <Col {...wrapperCol}>
                        <TopMoviesLikesBarChart />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <ViewsByPeriodCharts />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col {...wrapperCol}>
                        <RatingBarChart />
                    </Col>
                    <Col {...wrapperCol}>
                        <RatingDistributionHistogram />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col {...wrapperCol}>
                        <EngagementTypePieChart />
                    </Col>
                    <Col {...wrapperCol}>
                        <DeviceDistributionPieChart />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <PopularBrowsersBarChart />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <EngagementTimelineStackedLineChart />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <UserActivityHeatmap />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <TopCountriesBarChart />
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <UserLocationMapChart />
                    </Col>
                </Row>
            </div>

            {/* Báo cáo được render đặc biệt khi xuất PDF */}
            {isExporting && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1000,
                        overflow: 'hidden',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 1000, // Chiều rộng của báo cáo
                            // maxHeight: '90vh',
                            // overflowY: 'auto',
                            background: '#fff',
                            padding: '20px'
                        }}
                        ref={reportRef}
                    >
                        {reportData && (
                            <DashboardReportTemplate
                                data={reportData}
                                fromDate={fromDate}
                                toDate={toDate}
                                onChartRendered={handleChartRendered}
                            />
                        )}
                    </div>
                </div>
            )}
        </DashboardContext.Provider>
    );
};
