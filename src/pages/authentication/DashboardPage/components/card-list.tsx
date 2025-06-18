import type { ColProps } from "antd";
import { VideoCameraOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import CountUp from "react-countup";

const wrapperCol: ColProps = {
	xs: 24,
	sm: 24,
	md: 12,
	lg: 12,
	xl: 8,
	xxl: 8,
};

export default function CardList() {
	const CARD_LIST = [
		{
			title: "Tổng phim hiện có",
			data: 8000,
			icon: <VideoCameraOutlined />,
		},
		{
			title: "Tổng tài khoản hoạt động",
			data: 1000,
			icon: <UserOutlined />,
		},
		{
			title: "Tổng lượt xem",
			data: 24000,
			icon: <EyeOutlined />,
		},
	];

	return (
		<Row justify="space-between" gutter={[20, 20]}>
			{CARD_LIST.map((cardItem) => (
				<Col {...wrapperCol} key={cardItem.title}>
					<Card>
						<div className="flex justify-between items-center">
							<div className="flex flex-col">
								<h3 className="text-xl">{cardItem.title}</h3>
								<CountUp end={cardItem.data} separator="," />
							</div>
							<span className="text-3xl">{cardItem.icon}</span>
						</div>
					</Card>
				</Col>
			))}
		</Row>
	);
}
