import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ADD_AGENT_API } from "../../Const";
import "../css/AddAgent.css";

const AddAgent = () => {
  const [agentData, setAgentData] = useState({
    name: "",
    type: "",
    role: "",
    description: "",
    tag: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const token = useSelector((state) => state.login.token);

  const handleChange = (e) => {
    setAgentData({ ...agentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(ADD_AGENT_API, agentData, config);
      if (response.status === 200 && response.data.success) {
        alert("Agent added successfully");
        setNavigate(true);
      }
    } catch (error) {
      console.error("Error adding agent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (navigate) {
    // navigate('/workDoneCompleted');
    setAgentData({});
  }

  return (
    <div className="agent-form-container">
      <div>Add Agent</div>
      <form onSubmit={handleSubmit} className="agent-form">
        <label className="form-label">
          Name:
          <input
            name="name"
            value={agentData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-field"
          />
        </label>

        <label className="form-label">
          Type:
          <select
            name="type"
            value={agentData.type}
            onChange={handleChange}
            className="select-field"
          >
            <option value="">Select Agent Type</option>
            <option value="SalesAgent">Sales Agent</option>
            <option value="BusinessAdministrationAgent">
              Business Administration Agent
            </option>
            <option value="SEOAgent">SEO Agent</option>
            <option value="CustomerServiceAgent">Customer Service Agent</option>
            <option value="VirtualPersonalAssistant">
              Virtual Personal Assistant
            </option>
            <option value="ChatbotAgent">Chatbot Agent</option>
            <option value="MarketingAutomationAgent">
              Marketing Automation Agent
            </option>
            <option value="FinancialAdvisoryAgent">
              Financial Advisory Agent
            </option>
            <option value="HealthCareAssistant">Health Care Assistant</option>
            <option value="HumanResourcesAgent">Human Resources Agent</option>
            <option value="EducationAndTutoringAgent">
              Education and Tutoring Agent
            </option>
            <option value="DataAnalysisAgent">Data Analysis Agent</option>
            <option value="TranslationAgent">Translation Agent</option>
            <option value="SocialMediaManager">Social Media Manager</option>
            <option value="LogisticsCoordinator">Logistics Coordinator</option>
            <option value="LegalAssistantAgent">Legal Assistant Agent</option>
            <option value="ContentCreationAgent">Content Creation Agent</option>
            <option value="EcommerceAssistant">E-commerce Assistant</option>
            <option value="ResearchAndDevelopmentAgent">
              Research and Development Agent
            </option>
            <option value="SecurityAndSurveillanceAgent">
              Security and Surveillance Agent
            </option>
            <option value="PersonalShopperAgent">Personal Shopper Agent</option>
            <option value="RealEstateAssistant">Real Estate Assistant</option>
            <option value="TravelPlanningAgent">Travel Planning Agent</option>
            <option value="GamingAIAgent">Gaming AI Agent</option>
            <option value="EnvironmentalMonitoringAgent">
              Environmental Monitoring Agent
            </option>
          </select>
        </label>

        <label className="form-label">
          Role:
          <select
            name="role"
            value={agentData.role}
            onChange={handleChange}
            className="select-field"
          >
            <option value="">Select Agent Role</option>
            <option value="PredictiveAnalyst">Predictive Analyst</option>
            <option value="NaturalLanguageProcessor">
              Natural Language Processor
            </option>
            <option value="AutonomousVehicleController">
              Autonomous Vehicle Controller
            </option>
            <option value="RecommendationSystem">Recommendation System</option>
            <option value="FraudDetectionSpecialist">
              Fraud Detection Specialist
            </option>
            <option value="RoboticsControlAgent">Robotics Control Agent</option>
            <option value="SentimentAnalysisExpert">
              Sentiment Analysis Expert
            </option>
            <option value="ImageRecognitionSpecialist">
              Image Recognition Specialist
            </option>
            <option value="VirtualNurse">Virtual Nurse</option>
            <option value="AlgorithmicTrader">Algorithmic Trader</option>
            <option value="ChatbotDeveloper">Chatbot Developer</option>
            <option value="DataMiningExpert">Data Mining Expert</option>
            <option value="MachineLearningEngineer">
              Machine Learning Engineer
            </option>
            <option value="SpeechRecognitionSpecialist">
              Speech Recognition Specialist
            </option>
            <option value="AIResearchScientist">AI Research Scientist</option>
            <option value="CybersecurityAnalyst">Cybersecurity Analyst</option>
            <option value="PersonalizationEngineer">
              Personalization Engineer
            </option>
            <option value="SupplyChainOptimizer">Supply Chain Optimizer</option>
            <option value="CustomerExperienceAnalyst">
              Customer Experience Analyst
            </option>
            <option value="HealthcareDataAnalyst">
              Healthcare Data Analyst
            </option>
          </select>
        </label>

        <label className="form-label">
          Description:
          <textarea
            name="description"
            value={agentData.description}
            onChange={handleChange}
            placeholder="Description"
            className="textarea-field"
          ></textarea>
        </label>

        <label className="form-label">
          Tag:
          <input
            name="tag"
            value={agentData.tag}
            onChange={handleChange}
            placeholder="Tag"
            className="input-field"
          />
        </label>

        <button type="submit" disabled={isLoading} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAgent;
