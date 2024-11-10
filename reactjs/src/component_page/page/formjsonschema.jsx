import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { useState } from 'react';

// const schema = {
//     title: 'Todo',
//     type: 'object',
//     required: ['title'],
//     properties: {
//         title: { type: 'string', title: 'Title', default: 'A new task' },
//         done: { type: 'boolean', title: 'Done?', default: false },
//     },
// };

const schema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
        },
        done: {
            type: 'boolean',
        },
    },
};

const formData = {
    title: 'First task',
    done: true,
};

const log = (type) => console.log.bind(console, type);

const Formjsonschema = () => {
    const [formData, setFormData] = useState(null);
    console.log('Check form data state: ', formData)
    return (
        
        <Form
            // schema={{ type: 'string' }}
            schema={schema}
            formData={formData}
            onChange={(e) => setFormData(e.formData)}
            validator={validator}
        />
    );
};

export default Formjsonschema;
