import React, { useState, useEffect } from 'react';
// import { Button, Tag, Form, Divider, message } from 'antd';
import { Form, Tag, message, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { settingsAction } from '@/redux/settings/actions';
import { currencyAction } from '@/redux/currency/actions';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem } from '@/redux/erp/selectors';
import calculate from '@/utils/calculate';
import { generate as uniqueId } from 'shortid';
import Loading from '@/components/Loading';
import { ArrowLeftOutlined, ArrowRightOutlined, CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { selectLangDirection } from '@/redux/translate/selectors';
import * as XLSX from 'xlsx'; // Import XLSX library

function SaveForm({ form, handleFileUpload }) {
  const translate = useLanguage();

  const handleClick = () => {
    form.submit();
  };

  return (
    <>
      <Button onClick={handleClick} type="primary" icon={<PlusOutlined />} style={{ margin: '0px 8px 0px 0px' }}>
        {translate('Save')}
      </Button>

      <Button type="primary" icon={<UploadOutlined />} onClick={handleFileUpload}>Bulk</Button>
    </>
  );
}

export default function CreateItem({ config, CreateForm }) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
    dispatch(currencyAction.list());
  }, []);
  let { entity } = config;

  const { isLoading, isSuccess, result } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  const [jsonData, setJsonData] = useState(null); // State to store Excel data

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'create' }));
      navigate(`/${entity.toLowerCase()}/read/${result._id}`);
    }
    return () => { };
  }, [isSuccess]);





  const onSubmit = (fieldsValue) => {
    const numRows = 5; // Jumlah baris data yang ingin diproses
    const rowData = [];

    for (let i = 0; i <= numRows; i++) {
      const client = fieldsValue[`client${i}`];
      const rider = fieldsValue[`rider${i}`];
      const orderNumber = fieldsValue[`orderNumber${i}`];
      const status = fieldsValue[`status${i}`];
      const date = fieldsValue[`date${i}`];

      // Cek apakah semua properti data tidak kosong
      if (client && rider && orderNumber && status && date) {
        const data = { client, rider, orderNumber, status, date };
        rowData.push(data);
      }
    }

    rowData.forEach((row) => {
      if (row) {
        if (row.items) {
          let newList = [...row.items];
          newList.map((item) => {
            item.total = calculate.multiply(item.quantity, item.price);
          });
          row = {
            ...row,
            items: newList,
          };
        }
      }
      dispatch(erp.create({ entity, jsonData: row }));
    });
  };


  // const onSubmit = (fieldsValue) => {
  //   const rowData1 = {
  //     client: fieldsValue.client1,
  //     rider: fieldsValue.rider1,
  //     orderNumber: fieldsValue.orderNumber1,
  //     status: fieldsValue.status1,
  //     date: fieldsValue.date1,
  //   };
  //   const rowData2 = {
  //     client: fieldsValue.client2,
  //     rider: fieldsValue.rider2,
  //     orderNumber: fieldsValue.orderNumber2,
  //     status: fieldsValue.status2,
  //     date: fieldsValue.date2,
  //   };
  //   const rowData3 = {
  //     client: fieldsValue.client3,
  //     rider: fieldsValue.rider3,
  //     orderNumber: fieldsValue.orderNumber3,
  //     status: fieldsValue.status3,
  //     date: fieldsValue.date3,
  //   };
  //   const rowData4 = {
  //     client: fieldsValue.client4,
  //     rider: fieldsValue.rider4,
  //     orderNumber: fieldsValue.orderNumber4,
  //     status: fieldsValue.status4,
  //     date: fieldsValue.date4,
  //   };
  //   const rowData5 = {
  //     client: fieldsValue.client5,
  //     rider: fieldsValue.rider5,
  //     orderNumber: fieldsValue.orderNumber5,
  //     status: fieldsValue.status5,
  //     date: fieldsValue.date5,
  //   };



  //   console.log(rowData1);
  //   console.log(rowData2);
  //   console.log(rowData3);
  //   console.log(rowData4);
  //   console.log(rowData5);
  //   return;
  // }




  // const onSubmit = (fieldsValue) => {
  //   console.log(fieldsValue);
  //   return;

  //   const rowData1 = {
  //     client: fieldsValue.client,
  //     rider: fieldsValue.rider,
  //     orderNumber: fieldsValue.orderNumber,
  //     status: fieldsValue.status,
  //     date: fieldsValue.date,
  //   };
  //   const rowData2 = {
  //     client: fieldsValue.client2,
  //     rider: fieldsValue.rider2,
  //     orderNumber: fieldsValue.orderNumber2,
  //     status: fieldsValue.status2,
  //     date: fieldsValue.date2,
  //   };
  //   // console.log(rowData1);
  //   // console.log(rowData2);
  //   // return;

  //   if (rowData1) {
  //     if (rowData1.items) {
  //       let newList = [...rowData1.items];
  //       newList.map((item) => {
  //         item.total = calculate.multiply(item.quantity, item.price);
  //       });
  //       rowData1 = {
  //         ...rowData1,
  //         items: newList,
  //       };
  //     }
  //   }

  //   if (rowData2) {
  //     if (rowData2.items) {
  //       let newList = [...rowData2.items];
  //       newList.map((item) => {
  //         item.total = calculate.multiply(item.quantity, item.price);
  //       });
  //       rowData2 = {
  //         ...rowData2,
  //         items: newList,
  //       };
  //     }
  //   }

  //   dispatch(erp.create({ entity, jsonData: rowData1 }));
  //   dispatch(erp.create({ entity, jsonData: rowData2 }));
  // };



  // const onSubmit = (fieldsValue) => {
  //   console.log('🚀 ~ onSubmit ~ fieldsValue:', fieldsValue);
  //   if (fieldsValue) {
  //     if (fieldsValue.items) {
  //       let newList = [...fieldsValue.items];
  //       newList.map((item) => {
  //         item.total = calculate.multiply(item.quantity, item.price);
  //       });
  //       fieldsValue = {
  //         ...fieldsValue,
  //         items: newList,
  //       };
  //     }
  //   }
  //   dispatch(erp.create({ entity, jsonData: fieldsValue }));
  // };
  const langDirection = useSelector(selectLangDirection);



  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });

          // Fungsi untuk memformat tanggal
          const formatDate = (dateStr) => {
            const [day, month, year] = dateStr.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          };

          const formattedData = jsonData.slice(1).map((row) =>
            Object.fromEntries(row.map((value, index) => {
              const header = jsonData[0][index];
              if ((header === 'Date' || header === 'Expire Date') && typeof value === 'string') {
                return [header, formatDate(value)];
              }
              return [header, value];
            }))
          );

          console.log('Excel Data:', { data: formattedData });
          setJsonData(formattedData);
          // message.success('File uploaded successfully!');
          CreateForm({ jsonData: formattedData });
        };
        reader.readAsArrayBuffer(file);
      }
    };
    input.click();
  };



  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        backIcon={langDirection === 'rtl' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
        title={translate('New')}
        ghost={false}
        tags={<Tag>{translate('Draft')}</Tag>}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => navigate(`/${entity.toLowerCase()}`)}
            icon={<CloseCircleOutlined />}
          >
            {translate('Cancel')}
          </Button>,
          <SaveForm form={form} handleFileUpload={handleFileUpload} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        {/* <Form form={form} layout="vertical" onFinish={onSubmit}> */}
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          {/* CreateForm component receives jsonData as a prop */}
          <CreateForm jsonData={jsonData} />
        </Form>
      </Loading>
    </>
  );
}
