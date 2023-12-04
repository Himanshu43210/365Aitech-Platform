import React from "react";
import {
  ADD_AGENT,
  AGENT_HISTORY,
  ACTIVE_AGENTS,
  ARCHIVED_AGENTS,
  CONFIGURE_CHATBOT,
  CHATBOT_HISTORY,
  ACTIVE_CHATBOT,
  ARCHIVED_CHATBOT,
  SEO_PAGE,
  SMO_PAGE,
  ADD_CAMPAIGN,
  SERVICING,
  ERP_APP,
  LIVE_CALL,
  CHAT_WITH_US_PAGE,
  CALL_US_PAGE,
} from "../Const";
import AddAgent from "./pages/AddAgent";
import AgentHistory from "./pages/AgentHistory";
import ActiveAgent from "./pages/ActiveAgent";
import ArchivedAgent from "./pages/ArchivedAgent";
import DefaultPage from "./default";

function RenderPage({ currentPage }) {
  return (
    <>
      {currentPage === ADD_AGENT && <AddAgent />}
      {currentPage === AGENT_HISTORY && <AgentHistory />}
      {currentPage === ACTIVE_AGENTS && <ActiveAgent />}
      {currentPage === ARCHIVED_AGENTS && <ArchivedAgent />}
      {currentPage === CONFIGURE_CHATBOT && (
        <DefaultPage currentPage={currentPage} />
      )}
      {currentPage === CHATBOT_HISTORY && (
        <DefaultPage currentPage={currentPage} />
      )}
      {currentPage === ACTIVE_CHATBOT && (
        <DefaultPage currentPage={currentPage} />
      )}
      {currentPage === ARCHIVED_CHATBOT && (
        <DefaultPage currentPage={currentPage} />
      )}
      {currentPage === SEO_PAGE && <DefaultPage currentPage={currentPage} />}
      {currentPage === SMO_PAGE && <DefaultPage currentPage={currentPage} />}
      {currentPage === ADD_CAMPAIGN && (
        <DefaultPage currentPage={currentPage} />
      )}
      {currentPage === SERVICING && <DefaultPage currentPage={currentPage} />}
      {currentPage === ERP_APP && <DefaultPage currentPage={currentPage} />}
      {currentPage === LIVE_CALL && <DefaultPage currentPage={currentPage} />}
      {currentPage === CHAT_WITH_US_PAGE && (
        <DefaultPage currentPage={currentPage} />
      )}
      {currentPage === CALL_US_PAGE && (
        <DefaultPage currentPage={currentPage} />
      )}
    </>
  );
}

export default RenderPage;
