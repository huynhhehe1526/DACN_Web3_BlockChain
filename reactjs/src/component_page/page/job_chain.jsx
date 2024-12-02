import { CheckCircleOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Spin, Tag, message } from 'antd';
import React, { useEffect, useState } from 'react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const JobCard = ({ job }) => (
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

      <Button type="primary" block>
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
            <JobCard job={job} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JobList;
