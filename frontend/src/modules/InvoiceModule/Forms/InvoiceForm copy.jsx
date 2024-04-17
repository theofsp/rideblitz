import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
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
  // const [miloOptionFields, setMiloOptionFields] = useState([]);

  // useEffect(() => {
  //   // Filter out empty values and ignore the first element (index 0)
  //   const filteredFields = miloOptionFields.filter((field, index) => field !== '' && index !== 0);
  //   // Check if there are values to log
  //   if (filteredFields.length > 0) {
  //     console.log(filteredFields);
  //   }
  // }, [miloOptionFields]);

  // const handleMiloOptionFieldChange = (miloOptionField) => {
  //   if (miloOptionField !== '') {
  //     setMiloOptionFields((prevFields) => [...prevFields, miloOptionField]);
  //   }
  // };



  // const [miloOptionFields, setMiloOptionFields] = useState([]);

  // useEffect(() => {
  //   // Filter out empty values and ignore the first element (index 0)
  //   const filteredFields = miloOptionFields.filter((field, index) => field !== '' && index !== 0);
  //   // Check if there are values to log
  //   if (filteredFields.length > 0) {
  //     // Cari objek dengan name "Zalora" dan tampilkan _id-nya
  //     filteredFields.forEach(field => {
  //       if (field.name === 'Zalora') {
  //         console.log(field._id);
  //       }
  //     });
  //   }
  // }, [miloOptionFields]);

  // const handleMiloOptionFieldChange = (miloOptionField) => {
  //   if (miloOptionField !== '') {
  //     setMiloOptionFields((prevFields) => [...prevFields, miloOptionField]);
  //   }
  // };



  // const [miloOptionFields, setMiloOptionFields] = useState([]);

  // useEffect(() => {
  //   // Filter out empty values and ignore the first element (index 0)
  //   const filteredFields = miloOptionFields.filter((field, index) => field !== '' && index !== 0);
  //   // Check if there are values to log
  //   if (filteredFields.length > 0) {
  //     // Cari objek dengan name "Zalora" dan tampilkan _id-nya
  //     filteredFields.forEach(field => {
  //       jsonData.forEach((data) => {
  //         if (data.Client === field.name) {
  //           console.log(field._id);
  //           console.log(data);
  //         }
  //       });
  //     });
  //   }
  // }, [miloOptionFields]);

  // const handleMiloOptionFieldChange = (miloOptionField) => {
  //   if (miloOptionField !== '') {
  //     setMiloOptionFields((prevFields) => [...prevFields, miloOptionField]);
  //   }
  // };
  // console.log(jsonData)








  // const [miloOptionFields, setMiloOptionFields] = useState([]);
  // const [jsonDataState, setJsonDataState] = useState(jsonData);

  // useEffect(() => {
  //   const filteredFields = miloOptionFields.filter((field, index) => field !== '' && index !== 0);
  //   if (filteredFields.length > 0) {
  //     const updatedJsonData = jsonDataState.map(data => {
  //       const field = filteredFields.find(field => data.Client === field.name);
  //       return field ? { ...data, _id: field._id } : data;
  //     });

  //     if (JSON.stringify(jsonDataState) !== JSON.stringify(updatedJsonData)) {
  //       setJsonDataState(updatedJsonData);
  //     }
  //   }
  // }, [miloOptionFields, jsonDataState]);

  // const handleMiloOptionFieldChange = (miloOptionField) => {
  //   if (miloOptionField !== '') {
  //     setMiloOptionFields(prevFields => [...prevFields, miloOptionField]);
  //   }
  // };

  // // Log untuk debugging
  // console.log(jsonDataState);












  // const [miloOptionFields, setMiloOptionFields] = useState([]);

  // useEffect(() => {
  //   // Filter out empty values and ignore the first element (index 0)
  //   const filteredFields = miloOptionFields.filter((field, index) => field !== '' && index !== 0);
  //   // Check if there are values to log
  //   if (filteredFields.length > 0) {
  //     // Cari objek dengan name "Zalora" dan tambahkan _id-nya ke dalam data
  //     filteredFields.forEach(field => {
  //       jsonData.forEach((data) => {
  //         if (data.Client === field.name) {
  //           // Menetapkan _id dari field ke dalam objek data
  //           data._id = field._id;
  //           console.log(data);
  //         }
  //       });
  //     });
  //   }
  // }, [miloOptionFields, jsonData]);

  // const handleMiloOptionFieldChange = (miloOptionField) => {
  //   if (miloOptionField !== '') {
  //     setMiloOptionFields((prevFields) => [...prevFields, miloOptionField]);
  //   }
  // };




  // const [miloOptionFields, setMiloOptionFields] = useState([]);
  // const [dataToDisplay, setDataToDisplay] = useState([]); // State baru untuk menyimpan data yang akan ditampilkan

  // useEffect(() => {
  //   // Filter out empty values and ignore the first element (index 0)
  //   const filteredFields = miloOptionFields.filter((field, index) => field !== '' && index !== 0);
  //   // Check if there are values to log
  //   if (filteredFields.length > 0) {
  //     // Cari objek dengan name "Zalora" dan tambahkan _id-nya ke dalam data
  //     const newDataToDisplay = filteredFields.reduce((acc, field) => {
  //       jsonData.forEach((data) => {
  //         if (data.Client === field.name) {
  //           // Menetapkan _id dari field ke dalam objek data
  //           data._id = field._id;
  //           acc.push(data);
  //         }
  //       });
  //       return acc;
  //     }, []);
  //     setDataToDisplay(newDataToDisplay); // Simpan data yang ditemukan ke state
  //   }
  // }, [miloOptionFields, jsonData]);

  // const handleMiloOptionFieldChange = (miloOptionField) => {
  //   if (miloOptionField !== '') {
  //     setMiloOptionFields((prevFields) => [...prevFields, miloOptionField]);
  //   }
  // };



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

function LoadInvoiceFormEmpty() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const [miloOptionFields, setMiloOptionFields] = useState([]);
  // const [zaloraObj, setZaloraObj] = useState(null); // Deklarasi zaloraObj di dalam komponen
  const [zaloraObj, setZaloraObj] = useState("");

  useEffect(() => {
    const foundZaloraObj = miloOptionFields.find(obj => obj.name === 'Zalora');
    if (foundZaloraObj) {
      console.log('ID Zalora:', foundZaloraObj._id);
      // setZaloraObj(foundZaloraObj); // Update nilai zaloraObj jika ditemukan
      setZaloraObj(foundZaloraObj._id);
    }
  }, [miloOptionFields]);

  const handleMiloOptionFieldChange = (miloOptionField) => {
    setMiloOptionFields((prevFields) => [...prevFields, miloOptionField]);
  };


  return (
    <Row gutter={[12, 0]}>
      <Col className="gutter-row" span={6}>
        <Form.Item
          name="client"
          label={translate('Client')}
          rules={[
            {
              required: true,
            },
          ]}
        // initialValue="65f2c1f00068bfeda738532e"
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
        <Form.Item label={translate('Rider')} name="rider">
          <Input />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={6}>
        <Form.Item label={translate('Order Number')} name="orderNumber">
          <Input />
        </Form.Item>
      </Col>




      <Col className="gutter-row" span={6}>
        <Form.Item
          label={translate('status')}
          name="status"
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
          name="date"
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
