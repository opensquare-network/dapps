import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBehaviors, behaviorsSelector, behaviorsLoadingSelector } from "../../store/reducers/profileSlice";
import Empty from "@components/Empty";
import styled from "styled-components";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import Table from "antd/lib/table";
import ExtrinsicLink from "@components/ExtrinsicLink";
import DateShow from "@components/DateShow";
import BlockLink from "@components/BlockLink";
import AddressLink from "@components/AddressLink";
import ExtrinsicAction from "@components/ExtrinsicAction";
import Success from "@components/Success";
import Fail from "@components/Fail";

export const columns = [
  { title: 'Hash', dataIndex: 'hash' },
  { title: 'Block Time', dataIndex: 'timestamp' },
  { title: 'Block Height', dataIndex: 'height' },
  { title: 'Action', dataIndex: 'action' },
  { title: 'Result', dataIndex: 'result' },
]

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  & > span {
    margin-top: 10px;
  }
`

export default function BehaviorList() {
  const address = useSelector(nowAddressSelector)
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(20)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBehaviors(address, tablePage - 1, tablePageSize))
  }, [dispatch, address, tablePage, tablePageSize])

  const result = useSelector(behaviorsSelector)
  const loading = useSelector(behaviorsLoadingSelector)
  const { items: extrinsics, page, pageSize, total } =
    result || {
      items: [],
      page: 0,
      pageSize: tablePageSize,
      total: 0
    }
  if (extrinsics?.length > 0) {
    const dataSource = extrinsics.map(extrinsic => {
      const { hash, indexer, section, signer, name, args, isSuccess } = extrinsic

      return {
        hash: <ExtrinsicLink value={hash} truncate={true} />,
        index: extrinsic.indexer.index,
        timestamp: <DateShow value={indexer.blockTime} />,
        height: <BlockLink value={indexer.blockHeight} />,
        signer: <AddressLink addr={signer} truncate={true} />,
        action: <ExtrinsicAction section={section} name={name} />,
        result: isSuccess ? <Success /> : <Fail />,
        args,
        key: hash
      }
    })

    return (
      <div style={{marginTop: '20px'}}>
        <Table
          loading={loading}
          onChange={({ current, pageSize: size }) => {
            setTablePage(current)
            setTablePageSize(size)
          }}
          expandedRowRender={data => {
            return (
              <div>
                <h3 style={{ fontSize: '13px', paddingLeft: '2px' }}>args:</h3>
                <pre style={{ textAlign: 'left', margin: 0 }}>
                  {JSON.stringify(data.args, null, 2)}
                </pre>
              </div>
            )
          }}
          pagination={{ current: page + 1, pageSize, total }}
          size="small"
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    )
  }

  return (
    <Wrapper>
      <Empty>No Behaviors</Empty>
    </Wrapper>
  )
}
