import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { tagColor } from '@/utils/statusTagColor';

// import { useMoney, useDate } from '@/settings';
import { useDate } from '@/settings';
import InvoiceDataTableModule from '@/modules/InvoiceModule/InvoiceDataTableModule';

export default function Invoice() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'invoice';
  // const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'client',
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['client.name', 'label'];
  const dataTableColumns = [
    // {
    //   title: translate('Number'),
    //   dataIndex: 'number',
    // },
    {
      title: translate('Project'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Label'),
      dataIndex: 'label',
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    // {
    //   title: translate('expired Date'),
    //   dataIndex: 'expiredDate',
    //   render: (date) => {
    //     return dayjs(date).format(dateFormat);
    //   },
    // },
    // {
    //   title: translate('Total'),
    //   dataIndex: 'total',
    //   onCell: () => {
    //     return {
    //       style: {
    //         textAlign: 'right',
    //         whiteSpace: 'nowrap',
    //         direction: 'ltr',
    //       },
    //     };
    //   },
    //   render: (total, record) => {
    //     return moneyFormatter({ amount: total, currency_code: record.currency });
    //   },
    // },
    // {
    //   title: translate('paid'),
    //   dataIndex: 'credit',
    //   onCell: () => {
    //     return {
    //       style: {
    //         textAlign: 'right',
    //         whiteSpace: 'nowrap',
    //         direction: 'ltr',
    //       },
    //     };
    //   },
    //   render: (total, record) => moneyFormatter({ amount: total, currency_code: record.currency }),
    // },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        let tagStatus = tagColor(status);

        return (
          <Tag color={tagStatus.color}>
            {/* {tagStatus.icon + ' '} */}
            {status && translate(tagStatus.label)}
          </Tag>
        );
      },
    },
    {
      title: translate('Rider'),
      dataIndex: 'rider',
    },
    // {
    //   title: translate('Payment'),
    //   dataIndex: 'paymentStatus',
    //   render: (paymentStatus) => {
    //     let tagStatus = tagColor(paymentStatus);

    //     return (
    //       <Tag color={tagStatus.color}>
    //         {/* {tagStatus.icon + ' '} */}
    //         {paymentStatus && translate(paymentStatus)}
    //       </Tag>
    //     );
    //   },
    // },
    {
      title: translate('Created By'),
      dataIndex: ['createdBy', 'name'],
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('invoice'),
    DATATABLE_TITLE: translate('invoice_list'),
    ADD_NEW_ENTITY: translate('add_new_invoice'),
    ENTITY_NAME: translate('invoice'),

    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };

  return <InvoiceDataTableModule config={config} />;
}
