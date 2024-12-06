import { CheckCircleOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Spin, Tag, message, Modal, Rate, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRewardForWinner } from '../../redux/reward/rewardSlice';
import { useSelector } from 'react-redux';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInterviewModalVisible, setIsInterviewModalVisible] = useState(false);
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();

  const rewardData = useSelector((state) => state.reward);
  console.log("Reward data từ Redux state:", rewardData);


  const showModal = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };
  const userInfo = JSON.parse(sessionStorage.getItem('bitcoinInfo')) || {};
  const winnerId = userInfo?._id;

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // hiển thị modal câu hỏi và trả lời câu hỏi phỏng vấn
  const showInterviewModal = () => {

    setIsModalVisible(false);
    const jobId = selectedJob?._id;
    alert("Đang trả lời cho câu hỏi có id: " + jobId);
    setIsInterviewModalVisible(true);
  };


  const handleInterviewOk = async () => {
    const jobId = selectedJob?._id;
    const data = { winnerId, jobId, answer };

    try {
      const reward = await dispatch(getRewardForWinner(data)).unwrap();

      if (reward && reward.rewardDetails && reward.rewardDetails.error == 0) {
        notification.success({
          message: "Chúc mừng!",
          description: `Bạn đã hoàn thành nhiệm vụ, số tiền thưởng là: ${reward.rewardDetails.rewardAmount}`
        });
      } else {
        notification.error({
          message: 'Lỗi nhận phần thưởng',
          description: reward.rewardDetails.message
        });
      }

      console.log("Check reward: ", reward);

    } catch (error) {
      console.error("Lỗi khi lấy thông tin thưởng:", error);
      notification.error({
        message: "Lỗi",
        description: "Không thể lấy thông tin thưởng, vui lòng thử lại!"
      });
    }

    setIsInterviewModalVisible(false); // Đóng modal phỏng vấn
  };


  const handleInterviewCancel = () => {
    setIsInterviewModalVisible(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/getListJob');
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Got non-JSON response from server");
      }

      if (response.ok) {
        const data = await response.json();
        console.log('API response:', data);

        // Kiểm tra xem dữ liệu có phải là mảng mảng hay không
        const flattenedData = Array.isArray(data) ? data.flat() : data;  // Sử dụng flat để làm phẳng mảng
        setJobs(flattenedData);
      } else {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error details:', error);
      message.error('Failed to load jobs. Please try again later.');
      setJobs([]); // Hiển thị danh sách công việc trống khi có lỗi
    } finally {
      setLoading(false);
    }
  };


  // Mock data để kiểm tra UI khi API chưa hoạt động
  const mockJobs = [
    {
      _id: '1',
      title: 'Frontend Developer',
      description: 'We are looking for a Frontend Developer with React experience',
      rewardAmount: 1000,
      isCompleted: false,
      createdAt: new Date(),
    },
    {
      _id: '2',
      title: 'Backend Developer',
      description: 'Node.js developer needed for exciting project',
      rewardAmount: 1200,
      isCompleted: false,
      createdAt: new Date(),
    }
  ];

  const JobCard = ({ job, onClick }) => (
    <Card
      hoverable
      style={{ height: '100%' }}
    >
      <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{job.title}</h3>
      <p style={{
        color: '#666',
        marginBottom: '16px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {job.description}
      </p>

      <div style={{ marginBottom: '16px' }}>
        <Tag color="blue" icon={<DollarOutlined />}>
          Reward: ${job.rewardAmount}
        </Tag>
        <Tag color="green" icon={<CheckCircleOutlined />}>
          {job.isCompleted ? 'Completed' : 'Active'}
        </Tag>
        <Tag color="purple" icon={<ClockCircleOutlined />}>
          {new Date(job.createdAt).toLocaleDateString()}
        </Tag>
      </div>

      <Button type="primary"
        onClick={() => onClick(job)}
      >
        View Details
      </Button>
    </Card>
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Chọn dữ liệu mock khi không có dữ liệu từ API
  const displayJobs = jobs.length ? jobs : mockJobs;




  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px' }}>Available Jobs</h2>
      <Row gutter={[16, 16]}>
        {displayJobs.map((job) => (
          <Col xs={24} sm={12} md={8} key={job._id}> {/* Đảm bảo key là duy nhất */}
            {console.log('Job:', job)}
            <JobCard job={job} onClick={showModal} />
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedJob?.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="interview" type="primary"
            onClick={showInterviewModal}
          >
            Phỏng vấn
          </Button>
        ]}
        width={600}
        centered
      >
        {selectedJob && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="fit-img"
              style={{ width: '150px', height: '100px', marginBottom: '15px', position: "relative" }}
            >
              <img
                src="https://cdn-emhpc.nitrocdn.com/AyjjrzIbTRjscznLhXXeiwDLJcEMCvux/assets/images/optimized/rev-53fb32a/vnptvinaphone.net.vn/wp-content/uploads/2019/05/1-3202.png"
                alt={`${selectedJob.title} logo`}
                style={{
                  position: 'absolute', objectFit: 'contain', width: "100%", height: "100%"
                }}
              />
            </div>

            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedJob.title}</div>
            <div style={{ marginBottom: '10px', color: '#888' }}>
              <Rate disabled value={4.5} />
            </div>
            <div style={{ fontSize: '16px', color: '#333' }}>{selectedJob.description}</div>
          </div>
        )}
      </Modal >

      {/* Modal answers + questions */}
      <Modal
        title="Phỏng vấn"
        visible={isInterviewModalVisible}
        onOk={handleInterviewOk}
        onCancel={handleInterviewCancel}
        footer={
          [
            <Button key="submit" type="primary" onClick={handleInterviewOk}>
              Gửi câu trả lời
            </Button>
          ]}
        width={400}
        centered
      >
        {selectedJob &&
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Câu hỏi phỏng vấn:{selectedJob.question}</div>
            {/* <div style={{ marginBottom: '10px', fontStyle: 'italic' }}>Hãy cho chúng tôi biết về kinh nghiệm làm việc của bạn?</div> */}
            <Input.TextArea
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Nhập câu trả lời của bạn..."
            />
          </div>
        }

      </Modal >
    </div >
  );
};

export default JobList;
