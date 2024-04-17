import { useState, useEffect } from 'react';
// import { Form, Input, InputNumber, Row, Col } from 'antd';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, DatePicker } from 'antd';
import dayjs from 'dayjs';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
// import ItemRow from '@/modules/ErpPanelModule/ItemRow';
import { DeleteOutlined } from '@ant-design/icons';
import { useMoney, useDate } from '@/settings';
import calculate from '@/utils/calculate';
import useLanguage from '@/locale/useLanguage';

export default function ItemRow({ field, remove, current = null }) {
  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const handleMiloOptionFieldChange = (miloOptionField) => { };

  const money = useMoney();
  const updateQt = (value) => {
    setQuantity(value);
  };
  const updatePrice = (value) => {
    setPrice(value);
  };

  useEffect(() => {
    if (current) {
      // When it accesses the /payment/ endpoint,
      // it receives an invoice.item instead of just item
      // and breaks the code, but now we can check if items exists,
      // and if it doesn't we can access invoice.items.

      const { items, invoice } = current;

      if (invoice) {
        const item = invoice[field.fieldKey];

        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      } else {
        const item = items[field.fieldKey];

        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      }
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = calculate.multiply(price, quantity);

    setTotal(currentTotal);
  }, [price, quantity]);

  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      <Col className="gutter-row" span={6}>
        <Form.Item
          // name="client"
          name={[field.name, 'client1']}
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
        <Form.Item label={translate('Rider')} name={[field.name, 'rider1']}>
          <Input />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={6}>
        <Form.Item label={translate('Order Number')} name={[field.name, 'orderNumber1']}>
          <Input />
        </Form.Item>
      </Col>




      <Col className="gutter-row" span={6}>
        <Form.Item
          label={translate('status')}
          // name="status"
          name={[field.name, 'status1']}
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
          name={[field.name, 'date1']}
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
      {/* <Col className="gutter-row" span={5}>
        <Form.Item
          name={[field.name, 'itemName']}
          rules={[
            {
              required: true,
              message: 'Missing itemName name',
            },
            {
              pattern: /^(?!\s*$)[\s\S]+$/, // Regular expression to allow spaces, alphanumeric, and special characters, but not just spaces
              message: 'Item Name must contain alphanumeric or special characters',
            },
          ]}
        >
          <Input placeholder="Item Name" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={7}>
        <Form.Item name={[field.name, 'description']}>
          <Input placeholder="description Name" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={3}>
        <Form.Item name={[field.name, 'quantity']} rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={4}>
        <Form.Item name={[field.name, 'price']} rules={[{ required: true }]}>
          <InputNumber
            className="moneyInput"
            onChange={updatePrice}
            min={0}
            controls={false}
            addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
            addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item name={[field.name, 'total']}>
          <Form.Item>
            <InputNumber
              readOnly
              className="moneyInput"
              value={totalState}
              min={0}
              controls={false}
              addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
              addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
              formatter={(value) =>
                money.amountFormatter({ amount: value, currency_code: money.currency_code })
              }
            />
          </Form.Item>
        </Form.Item>
      </Col> */}

      <div style={{ position: 'absolute', right: '-20px', top: ' 5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
    </Row>
  );
}
