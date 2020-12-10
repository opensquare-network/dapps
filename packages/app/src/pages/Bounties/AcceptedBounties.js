import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBounties, bountiesSelector } from "../../store/reducers/explorerSlice";
import EmptyBounty from "@pages/Bounties/EmptyBounty";
import styled from "styled-components";
import Container from "@components/Container";
import { Pagination } from 'antd';
import BountyList from "../../components/BountyList";

const Wrapper = styled(Container)`
  & > main {
  }
  margin-top: 26px;
`

export default function AcceptedBounties() {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(5)
  const dispatch = useDispatch()

  useEffect(() => {
    // for test qiyisi
    // dispatch(fetchBounties({}, 0, 20))
    dispatch(fetchBounties({ state: 'Accepted' }, 0, 20))
  }, [dispatch, tablePage, tablePageSize])

  const { items: bounties, page, pageSize, total } = useSelector(bountiesSelector)
  if (bounties.length <= 0) {
    return <EmptyBounty />
  }

  return (
    <Wrapper>
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
    </Wrapper>
  )
}
