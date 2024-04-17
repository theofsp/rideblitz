import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import ItemRow from '@/modules/ErpPanelModule/ItemRow';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';
import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';

export default function InvoiceForm({ jsonData, subTotal = 0, current = null }) {
  const { last_invoice_number } = useSelector(selectFinanceSettings);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (jsonData && jsonData.length > 0) {
      setHasData(true);
    } else {
      setHasData(false);
    }
  }, [jsonData]);

  if (last_invoice_number === undefined) {
    return <></>;
  }

  return hasData ? (
    <LoadInvoiceForm jsonData={jsonData} subTotal={subTotal} current={current} />
  ) : (
    <LoadInvoiceFormEmpty />
  );
}

function LoadInvoiceForm({ jsonData, subTotal = 0, current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const [miloOptionFields, setMiloOptionFields] = useState([]);
  const [uniqueData, setUniqueData] = useState([]); // State baru untuk menyimpan data unik

  useEffect(() => {
    // Filter out empty values and ignore the first element (index 0)
    const filteredFields = miloOptionFields.filter((field, index) => field !== '');
    // Check if there are values to log
    if (filteredFields.length > 0) {
      // Cari objek dengan name "Zalora" dan tambahkan _id-nya ke dalam data
      const uniqueDataMap = {};
      filteredFields.forEach(field => {
        jsonData.forEach((data) => {
          if (data.Client === field.name && !uniqueDataMap[data.Order_Number]) {
            // Menetapkan _id dari field ke dalam objek data
            data._id = field._id;
            uniqueDataMap[data.Order_Number] = data; // Simpan data berdasarkan Order_Number
          }
        });
      });
      setUniqueData(Object.values(uniqueDataMap)); // Konversi objek menjadi array dan simpan ke state
    }
  }, [miloOptionFields, jsonData]);

  const handleMiloOptionFieldChange = (miloOptionField) => {
    if (miloOptionField !== '') {
      setMiloOptionFields((prevFields) => [...prevFields, miloOptionField]);
    }
  };
  console.log("jsonData: ", jsonData);
  console.log("uniqueData: ", uniqueData);






  return (
    <>
      {jsonData.map((data, index) => (
        <Row gutter={[12, 0]} key={index}>
          {/* <div>{data._id}</div> */}

          <Col className="gutter-row" span={6} key={data._id}>
            <Form.Item
              name={`client${index}`}
              label={translate('Client')}
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={data._id}
            >
              <AutoCompleteAsync
                entity={'client'}
                displayLabels={['name']}
                searchFields={'name'}
                redirectLabel={'Add New Client'}
                withRedirect
                urlToRedirect={'/customer'}
                defaultValue={data.Client}
                bio={data.Client}
                onMiloOptionFieldChange={handleMiloOptionFieldChange}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item label={translate('Rider')} name={`rider${index}`} initialValue={data.Rider}>
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item label={translate('Order Number')} name={`orderNumber${index}`} initialValue={data.Order_Number}>
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item
              label={translate('status')}
              name={`status${index}`}
              rules={[
                {
                  required: false,
                },
              ]}
              initialValue={data.Status}
            >
              <Select
                options={[
                  { value: 'ontime', label: translate('Ontime') },
                  { value: 'late', label: translate('Late') },
                ]}
              ></Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item
              name={`date${index}`}
              label={translate('Date')}
              rules={[
                {
                  required: true,
                  type: 'object',
                },
              ]}
              initialValue={dayjs(data.Date)}
            >
              <DatePicker style={{ width: '100%' }} format={dateFormat} />
            </Form.Item>
          </Col>
        </Row >
      ))
      }


      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
}

function LoadInvoiceFormEmpty({ index = 0, current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const handleMiloOptionFieldChange = (miloOptionField) => { };


  const addField = useRef(false);

  useEffect(() => {
    addField.current.click();
  }, []);


  return (
    <Row gutter={[12, 0]}>
      <Col className="gutter-row" span={6}>
        <Form.Item
          // name="client"
          name={`client${index}`}
          label={translate('Client')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AutoCompleteAsync
            entity={'client'}
            displayLabels={['name']}
            searchFields={'name'}
            redirectLabel={'Add New Client'}
            withRedirect
            urlToRedirect={'/customer'}
            onMiloOptionFieldChange={handleMiloOptionFieldChange}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={6}>
        <Form.Item label={translate('Rider')} name={`rider${index}`}>
          <Input />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={6}>
        <Form.Item label={translate('Order Number')} name={`orderNumber${index}`}>
          <Input />
        </Form.Item>
      </Col>




      <Col className="gutter-row" span={6}>
        <Form.Item
          label={translate('status')}
          // name="status"
          name={`status${index}`}
          rules={[
            {
              required: false,
            },
          ]}
          initialValue={'ontime'}
        >
          <Select
            options={[
              { value: 'ontime', label: translate('Ontime') },
              { value: 'late', label: translate('Late') },
            ]}
          ></Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={6}>
        <Form.Item
          // name="date"
          name={`date${index}`}
          label={translate('Date')}
          rules={[
            {
              required: true,
              type: 'object',
            },
          ]}
          initialValue={dayjs()}
        >
          <DatePicker style={{ width: '100%' }} format={dateFormat} />
        </Form.Item>
      </Col>
      <Divider dashed />



      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                {translate('Add field')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Row>
  );
}
