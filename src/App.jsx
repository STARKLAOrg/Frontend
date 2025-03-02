// 📦 External Libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🏗️ Layout
import MainLayout from "@/components/layout/main-layout";

// 📚 Learning & Education
import LearningContent from "@/pages/aurora-site/learning/learning-content";
import VocabularyPage from "@/pages/aurora-site/learning/vocabulary-content";
import SpeakingPage from "@/pages/aurora-site/learning/speaking-content";
import ListeningPage from "@/pages/aurora-site/learning/listening-content";
import ReadingContent from "@/pages/aurora-site/learning/reading-content";

// 🎓 Certifications & Courses
import CertificationsObtained from "@/pages/aurora-site/english-level/english-level-obtained";
import CertificationContent from "@/pages/aurora-site/english-level/english-level-content";
import ModuleDetails from "@/pages/aurora-site/modules/module-details";

// ⚙️ System & Settings
import SettingsPage from "@/pages/aurora-site/settings";
import WalletConnection from "@/pages/aurora-site/wallet/wallet-connection";
import Notifications from "@/pages/aurora-site/notifications";

// 🌐 Community & Interaction
import CommunityInteractionPage from "@/pages/aurora-site/community/community";
import StarklaChat from "@/pages/aurora-site/aurora-chat";

// 📊 Analytics & Categories
import Categories from "@/pages/aurora-site/categories";
import Analytics from "@/pages/aurora-site/analytics";

// 🏠 Main Pages
import HomePage from "@/pages/aurora-site/home";

// 🧩 Games & Challenges
import StoryGame from "@/pages/games/story-game";
import WordMatching from "@/pages/games/word-matching";
import GamePanel from "@/pages/games/game-panel";
import DifficultySelector from "./components/Games/memory-card/difficulty-selector";
import GameBoard from "./components/Games/memory-card/game-board";

// 📝 Practices & Exercises
import PracticeSystem from "@/components/practices/exercises/drag-drop-sentence-builder";
import SentenceBuilder from "@/components/practices/exercises/sentence-builder";

// 🧠 Quizzes
import Quiz from "@/pages/aurora-site/quizzes/quiz";
import FillInTheBlanksQuizPage from "@/pages/aurora-site/quizzes/fill-in-the-blanks-quiz";

// 🏛️ Grammar & Language
import GrammarContent from "@/pages/aurora-site/grammar-content";


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learning-content" element={<LearningContent />} />
          <Route path="/wallet-connection" element={<WalletConnection />} />
          <Route path="/certifications-obtained" element={<CertificationsObtained />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/starkla-chat" element={<StarklaChat />} />
          <Route path="/certification-content" element={<CertificationContent />} />
          <Route path="/module-details" element={<ModuleDetails />} />

          <Route path='/practiceSystem' element={<PracticeSystem/>}/>
          <Route path="/practice/sentence-builder" element={<SentenceBuilder />} />
          <Route path="/practice/drag-drop-sentence-builder" element={<PracticeSystem/>}/>
          <Route path="/notifications" element={<Notifications />} />

          <Route path="/story-game" element={<StoryGame />} />
          <Route path="/games/word-matching/" element={<WordMatching />} />
          <Route path="/games" element={<GamePanel />} />
          <Route path="/games/memory-card" element={<DifficultySelector />} />
          <Route path="/games/memory-card/:levelId" element={<GameBoard />} />
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/fill-in-the-blanks" element={<FillInTheBlanksQuizPage />} />
          <Route path="/grammar" element={<GrammarContent />} />
          <Route path='/vocabulary' element={<VocabularyPage />} />
          <Route path='/speaking' element={<SpeakingPage />} />
          <Route path='/listening' element={<ListeningPage />} />
          <Route path='/reading' element={<ReadingContent />} />
          <Route path='/people' element={<CommunityInteractionPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;