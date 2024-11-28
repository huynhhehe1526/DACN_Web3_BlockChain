
import React from "react";

import { Card, Button, Row, Col } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
const companies = [
    { name: "Collaboration Betters The World - B.O.T", location: "Ho Chi Minh - Ha Noi", jobs: 1 },
    { name: "MB Bank", location: "Ha Noi", jobs: 6 },
    { name: "LG Electronics Development Vietnam (LGEDV)", location: "Da Nang - Others - Ha Noi", jobs: 4 },
    { name: "FPT Software", location: "Ho Chi Minh - Da Nang - Others", jobs: 5 },
    { name: "Techcombank", location: "Ha Noi", jobs: 10 },
    { name: "ELCA", location: "Ho Chi Minh", jobs: 4 },
];


const CompanyCard = ({ company }) => {
    return (
        <Card
            hoverable
            cover={<div className="card-logo">{company.name.split(" ")[0]}</div>}
            className="company-card"
        >
            <Card.Meta
                title={company.name}
                description={company.location}
            />
            <div style={{ marginTop: 16 }}>
                <p className="jobs-count">{company.jobs} Việc làm</p>
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    icon={<HeartOutlined />}
                    style={{ marginTop: 10 }}
                >
                    Xem việc làm
                </Button>
            </div>
        </Card>
    );
};
const JobChain = () => {
    return (
        <Row gutter={[16, 24]} justify="start">
            {companies.map((company, index) => (
                <Col span={8} key={index}>
                    <CompanyCard company={company} />
                </Col>
            ))}
        </Row>
    )
}

export default JobChain;