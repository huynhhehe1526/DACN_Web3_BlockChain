import { Button, Card, Form, Input, InputNumber, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

const CreateJob = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Fetch request to create a new job
      const response = await fetch('http://localhost:8080/api/create_job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from server");
      }

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.message || 'Failed to create job');
      }

      message.success('Job created successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error details:', error);
      message.error('Failed to create job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Create New Job" style={{ maxWidth: 800, margin: '0 auto' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: 'Please input job title!' }]}
          >
            <Input placeholder="Enter job title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input job description!' }]}
          >
            <TextArea rows={4} placeholder="Enter job description" />
          </Form.Item>

          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: 'Please input screening question!' }]}
          >
            <Input placeholder="Enter screening question" />
          </Form.Item>

          <Form.Item
            name="correctAnswer"
            label="Correct Answer"
            rules={[{ required: true, message: 'Please input correct answer!' }]}
          >
            <Input placeholder="Enter correct answer" />
          </Form.Item>

          <Form.Item
            name="rewardAmount"
            label="Reward Amount"
            rules={[{ required: true, message: 'Please input reward amount!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="Enter reward amount"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Create Job
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateJob;
