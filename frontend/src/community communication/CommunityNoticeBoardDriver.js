import CommunityNoticeBoard from "./CommunityNoticeBoard";

const CommunityNoticeBoardDriver = ()=>{
    const role=true;
    return <CommunityNoticeBoard isAdmin={role} />
}

export default CommunityNoticeBoardDriver;