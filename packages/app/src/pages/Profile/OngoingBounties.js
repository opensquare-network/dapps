import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOngoingBounties, ongoingBountiesSelector } from "../../store/reducers/profileSlice";
import Empty from "@components/Empty";
import styled from "styled-components";
import { nowAddressSelector } from "@store/reducers/accountSlice";
import { Pagination } from 'antd';
import BountyList from "../../components/BountyList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

  & > span {
    margin-top: 10px;
  }
`

export default function OngoingBounites() {
  const address = useSelector(nowAddressSelector)
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(20)
  const dispatch = useDispatch()

  console.log(address)

  useEffect(() => {
    dispatch(fetchOngoingBounties(address, tablePage - 1, tablePageSize))
  }, [dispatch, address, tablePage, tablePageSize])

  const result = useSelector(ongoingBountiesSelector)
  const { items: bounties, page, pageSize, total } =
    result || {
      items: [],
      page: 0,
      pageSize: tablePageSize,
      total: 0
    }
  if (bounties?.length > 0) {
    return (
      <div style={{marginTop: '20px'}}>
        <BountyList bounties={bounties} />
        <Pagination
          defaultCurrent={page}
          pageSize={pageSize}
          total={total}
          onChange={(page, pageSize) => {
            setTablePage(page)
            setTablePageSize(pageSize)
          }}
        />
      </div>
    )
  }

  return (
    <Wrapper>
      <Empty>No Ongoing Bounties</Empty>
    </Wrapper>
  )
}
