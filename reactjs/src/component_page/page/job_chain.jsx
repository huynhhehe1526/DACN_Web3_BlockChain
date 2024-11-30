// import React from "react";
// import { Card, Button, Row, Col } from 'antd';
// import { HeartOutlined } from '@ant-design/icons';

// const companies = [
//     { name: "Collaboration Betters The World - B.O.T", location: "Ho Chi Minh - Ha Noi", jobs: 1, image: "https://api.collaborationbetterstheworld.com/wp-content/uploads/Primary_Classic@3x.png" },
//     { name: "MB Bank", location: "Ha Noi", jobs: 6, image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png" },
//     { name: "LG Electronics Development Vietnam (LGEDV)", location: "Da Nang - Others - Ha Noi", jobs: 4, image: "https://cdn.timviectop.com/img/2023-12-02/656b3937c45f9eeb42532402.jpg" },
//     { name: "FPT Software", location: "Ho Chi Minh - Da Nang - Others", jobs: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQidufvPO8Rle_bxQvo-DyD2oPxNT63psE_lA&s" },
//     { name: "Techcombank", location: "Ha Noi", jobs: 10, image: "https://ducanhland.com/wp-content/uploads/2021/08/Techcombank_logo.png" },
//     { name: "ELCA", location: "Ho Chi Minh", jobs: 4, image: "https://1900.com.vn/storage/uploads/companies/logo/58/elca-1692587712.png" },
// ];

// const CompanyCard = ({ company }) => {
//     return (
//         <Card
//             hoverable
//             cover={
//                 <img
//                     alt={`${company.name} logo`}
//                     src={company.image}
//                     className="company-logo"
//                     style={{ height: "150px", objectFit: "cover" }}
//                 />
//             }
//             className="company-card"
//             style={{
//                 padding: '10px',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//             }}
//         >
//             <Card.Meta
//                 title={company.name}
//                 description={company.location}
//             />
//             <div style={{ marginTop: 16 }}>
//                 <p className="jobs-count" style={{ fontSize: '14px', color: '#888' }}>{company.jobs} Việc làm</p>
//                 <Button
//                     type="primary"
//                     shape="round"
//                     size="large"
//                     icon={<HeartOutlined />}
//                     style={{
//                         marginTop: 10,
//                         padding: '5px 15px',
//                         fontSize: '14px',
//                     }}
//                 >
//                     Xem việc làm
//                 </Button>
//             </div>
//         </Card>
//     );
// };

// const JobChain = () => {
//     return (
//         <>
//             <h1 style={{ textAlign: "center", marginBottom: '20px', fontSize: '24px' }}>Danh sách công ty và việc làm</h1>
//             <Row gutter={[16, 24]} justify="start">
//                 {companies.map((company, index) => (
//                     <Col span={8} key={index}>
//                         <CompanyCard company={company} />
//                     </Col>
//                 ))}
//             </Row>
//         </>
//     );
// }

// export default JobChain;
















// import React, { useState } from "react";
// import { Card, Button, Row, Col, Modal, Rate } from 'antd';
// import { HeartOutlined } from '@ant-design/icons';

// const companies = [
//     { name: "Collaboration Betters The World - B.O.T", location: "Ho Chi Minh - Ha Noi", jobs: 1, image: "https://api.collaborationbetterstheworld.com/wp-content/uploads/Primary_Classic@3x.png", description: "Mô tả công ty B.O.T", rating: 4 },
//     { name: "MB Bank", location: "Ha Noi", jobs: 6, image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png", description: "Mô tả công ty MB Bank", rating: 5 },
//     { name: "LG Electronics Development Vietnam (LGEDV)", location: "Da Nang - Others - Ha Noi", jobs: 4, image: "https://cdn.timviectop.com/img/2023-12-02/656b3937c45f9eeb42532402.jpg", description: "Mô tả công ty LG Electronics", rating: 4.5 },
//     { name: "FPT Software", location: "Ho Chi Minh - Da Nang - Others", jobs: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQidufvPO8Rle_bxQvo-DyD2oPxNT63psE_lA&s", description: "Mô tả công ty FPT Software", rating: 4 },
//     { name: "Techcombank", location: "Ha Noi", jobs: 10, image: "https://casso.vn/wp-content/uploads/2023/07/Logo-TCB-H-1024x341.webp", description: "Mô tả công ty Techcombank", rating: 4.5 },
//     { name: "ELCA", location: "Ho Chi Minh", jobs: 4, image: "https://1900.com.vn/storage/uploads/companies/logo/58/elca-1692587712.png", description: "Mô tả công ty ELCA", rating: 5 },
// ];

// const CompanyCard = ({ company, onClick }) => {
//     return (
//         <Card
//             hoverable
//             cover={
//                 <img
//                     alt={`${company.name} logo`}
//                     src={company.image}
//                     className="company-logo"
//                     style={{ height: "150px", objectFit: "cover" }}
//                 />
//             }
//             className="company-card"
//             style={{
//                 padding: '10px',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//             }}
//         >
//             <Card.Meta
//                 title={company.name}
//                 description={company.location}
//             />
//             <div style={{ marginTop: 16 }}>
//                 <p className="jobs-count" style={{ fontSize: '14px', color: '#888' }}>{company.jobs} Việc làm</p>
//                 <Button
//                     type="primary"
//                     shape="round"
//                     size="large"
//                     icon={<HeartOutlined />}
//                     style={{
//                         marginTop: 10,
//                         padding: '5px 15px',
//                         fontSize: '14px',
//                     }}
//                     onClick={() => onClick(company)} // Gọi onClick khi người dùng nhấn vào nút "Xem việc làm"
//                 >
//                     Xem việc làm
//                 </Button>
//             </div>
//         </Card>
//     );
// };

// const JobChain = () => {
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [selectedCompany, setSelectedCompany] = useState(null);
//     const [isInterviewModalVisible, setIsInterviewModalVisible] = useState(false); // State cho modal phỏng vấn
//     const [answer, setAnswer] = useState(""); // State lưu câu trả lời

//     // Hàm mở modal
//     const showModal = (company) => {
//         setSelectedCompany(company);
//         setIsModalVisible(true);
//     };

//     // Hàm mở modal phỏng vấn
//     const showInterviewModal = () => {
//         setIsModalVisible(false); // Đóng modal công ty
//         setIsInterviewModalVisible(true); // Mở modal phỏng vấn
//     };

//     // Hàm đóng modal
//     const handleOk = () => {
//         setIsModalVisible(false);
//     };

//     // Hàm đóng modal khi bấm ngoài modal
//     const handleCancel = () => {
//         setIsModalVisible(false);
//     };

//     return (
//         <>
//             <h1 style={{ textAlign: "center", marginBottom: '20px', fontSize: '24px' }}>Danh sách công ty và việc làm</h1>
//             <Row gutter={[16, 24]} justify="start">
//                 {companies.map((company, index) => (
//                     <Col span={8} key={index}>
//                         <CompanyCard company={company} onClick={showModal} />
//                     </Col>
//                 ))}
//             </Row>

//             {/* Modal hiển thị chi tiết công ty */}
//             <Modal
//                 title={selectedCompany?.name}
//                 visible={isModalVisible}
//                 onOk={handleOk}
//                 onCancel={handleCancel}
//                 footer={[
//                     <Button key="interview" type="primary">
//                         Phỏng vấn
//                     </Button>
//                 ]}
//                 width={600}
//                 centered
//             >
//                 {selectedCompany && (
//                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                         <div className="fit-img"
//                             style={{ width: '150px', height: '100px', marginBottom: '15px', position: "relative" }}
//                         >
//                             <img
//                                 src={selectedCompany.image}
//                                 alt={`${selectedCompany.name} logo`}
//                                 style={{
//                                     position: 'absolute', objectFit: 'contain', width: "100%", height: "100%"
//                                 }}
//                             />
//                         </div>

//                         <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedCompany.name}</div>
//                         <div style={{ marginBottom: '10px', color: '#888' }}>
//                             <Rate disabled value={selectedCompany.rating} />
//                         </div>
//                         <div style={{ fontSize: '16px', color: '#333' }}>{selectedCompany.description}</div>
//                     </div>
//                 )}
//             </Modal>


//             {/* Modal phỏng vấn */}
//             <Modal
//                 title="Phỏng vấn"
//                 visible={isInterviewModalVisible}
//                 onOk={handleInterviewOk}
//                 onCancel={handleInterviewCancel}
//                 footer={[
//                     <Button key="submit" type="primary" onClick={handleInterviewOk}>
//                         Gửi câu trả lời
//                     </Button>
//                 ]}
//                 width={400}
//                 centered
//             >
//                 <div style={{ marginBottom: '10px' }}>
//                     <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Câu hỏi phỏng vấn:</div>
//                     <div style={{ marginBottom: '10px', fontStyle: 'italic' }}>Hãy cho chúng tôi biết về kinh nghiệm làm việc của bạn?</div>
//                     <Input.TextArea
//                         rows={4}
//                         value={answer}
//                         onChange={(e) => setAnswer(e.target.value)}
//                         placeholder="Nhập câu trả lời của bạn..."
//                     />
//                 </div>
//             </Modal>
//         </>
//     );
// };

// export default JobChain;





import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Rate, Input } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const companies = [
    { name: "Collaboration Betters The World - B.O.T", location: "Ho Chi Minh - Ha Noi", jobs: 1, image: "https://api.collaborationbetterstheworld.com/wp-content/uploads/Primary_Classic@3x.png", description: "Mô tả công ty B.O.T", rating: 4 },
    { name: "MB Bank", location: "Ha Noi", jobs: 6, image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png", description: "Mô tả công ty MB Bank", rating: 5 },
    { name: "LG Electronics Development Vietnam (LGEDV)", location: "Da Nang - Others - Ha Noi", jobs: 4, image: "https://cdn.timviectop.com/img/2023-12-02/656b3937c45f9eeb42532402.jpg", description: "Mô tả công ty LG Electronics", rating: 4.5 },
    { name: "FPT Software", location: "Ho Chi Minh - Da Nang - Others", jobs: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQidufvPO8Rle_bxQvo-DyD2oPxNT63psE_lA&s", description: "Mô tả công ty FPT Software", rating: 4 },
    { name: "Techcombank", location: "Ha Noi", jobs: 10, image: "https://casso.vn/wp-content/uploads/2023/07/Logo-TCB-H-1024x341.webp", description: "Mô tả công ty Techcombank", rating: 4.5 },
    { name: "ELCA", location: "Ho Chi Minh", jobs: 4, image: "https://1900.com.vn/storage/uploads/companies/logo/58/elca-1692587712.png", description: "Mô tả công ty ELCA", rating: 5 },
];

const CompanyCard = ({ company, onClick }) => {
    return (
        <Card
            hoverable
            cover={
                <img
                    alt={`${company.name} logo`}
                    src={company.image}
                    className="company-logo"
                    style={{ height: "150px", objectFit: "cover" }}
                />
            }
            className="company-card"
            style={{
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Card.Meta
                title={company.name}
                description={company.location}
            />
            <div style={{ marginTop: 16 }}>
                <p className="jobs-count" style={{ fontSize: '14px', color: '#888' }}>{company.jobs} Việc làm</p>
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    icon={<HeartOutlined />}
                    style={{
                        marginTop: 10,
                        padding: '5px 15px',
                        fontSize: '14px',
                    }}
                    onClick={() => onClick(company)} // Gọi onClick khi người dùng nhấn vào nút "Xem việc làm"
                >
                    Xem việc làm
                </Button>
            </div>
        </Card>
    );
};

const JobChain = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isInterviewModalVisible, setIsInterviewModalVisible] = useState(false); // State cho modal phỏng vấn
    const [answer, setAnswer] = useState(""); // State lưu câu trả lời

    // Hàm mở modal công ty
    const showModal = (company) => {
        setSelectedCompany(company);
        setIsModalVisible(true);
    };

    // Hàm mở modal phỏng vấn
    const showInterviewModal = () => {
        setIsModalVisible(false); // Đóng modal công ty
        setIsInterviewModalVisible(true); // Mở modal phỏng vấn
    };

    // Hàm đóng modal công ty
    const handleOk = () => {
        setIsModalVisible(false);
    };

    // Hàm đóng modal công ty khi bấm ngoài modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Hàm đóng modal phỏng vấn
    const handleInterviewOk = () => {
        console.log("Câu trả lời: ", answer); // Xử lý câu trả lời tại đây
        setIsInterviewModalVisible(false); // Đóng modal phỏng vấn
    };

    // Hàm đóng modal phỏng vấn khi bấm ngoài modal
    const handleInterviewCancel = () => {
        setIsInterviewModalVisible(false);
    };

    return (
        <>
            <h1 style={{ textAlign: "center", marginBottom: '20px', fontSize: '24px' }}>Danh sách công ty và việc làm</h1>
            <Row gutter={[16, 24]} justify="start">
                {companies.map((company, index) => (
                    <Col span={8} key={index}>
                        <CompanyCard company={company} onClick={showModal} />
                    </Col>
                ))}
            </Row>

            {/* Modal hiển thị chi tiết công ty */}
            <Modal
                title={selectedCompany?.name}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="interview" type="primary" onClick={showInterviewModal}>
                        Phỏng vấn
                    </Button>
                ]}
                width={600}
                centered
            >
                {selectedCompany && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="fit-img"
                            style={{ width: '150px', height: '100px', marginBottom: '15px', position: "relative" }}
                        >
                            <img
                                src={selectedCompany.image}
                                alt={`${selectedCompany.name} logo`}
                                style={{
                                    position: 'absolute', objectFit: 'contain', width: "100%", height: "100%"
                                }}
                            />
                        </div>

                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedCompany.name}</div>
                        <div style={{ marginBottom: '10px', color: '#888' }}>
                            <Rate disabled value={selectedCompany.rating} />
                        </div>
                        <div style={{ fontSize: '16px', color: '#333' }}>{selectedCompany.description}</div>
                    </div>
                )}
            </Modal>

            {/* Modal phỏng vấn */}
            <Modal
                title="Phỏng vấn"
                visible={isInterviewModalVisible}
                onOk={handleInterviewOk}
                onCancel={handleInterviewCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={handleInterviewOk}>
                        Gửi câu trả lời
                    </Button>
                ]}
                width={400}
                centered
            >
                <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Câu hỏi phỏng vấn:</div>
                    <div style={{ marginBottom: '10px', fontStyle: 'italic' }}>Hãy cho chúng tôi biết về kinh nghiệm làm việc của bạn?</div>
                    <Input.TextArea
                        rows={4}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Nhập câu trả lời của bạn..."
                    />
                </div>
            </Modal>
        </>
    );
};

export default JobChain;

