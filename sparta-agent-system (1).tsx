import React, { useState, useEffect } from 'react';
import { Trophy, Award, Users, TrendingUp, Wallet, CheckCircle, XCircle, Star, Zap, Target, Crown, Play, RotateCcw } from 'lucide-react';

const SpartaAgentSystem = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [score, setScore] = useState(0);
  const [agentScore, setAgentScore] = useState(250); // Starting score
  const [nftMinted, setNftMinted] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [mintingNFT, setMintingNFT] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main mission of Lab Project Spartan?",
      options: [
        "Build a blockchain token",
        "End fake guru culture and help businesses modernize",
        "Sell online courses",
        "Promote MLMs"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "What two certifications can an agent earn in the system?",
      options: [
        "Salesman and Manager",
        "Full Time Agent and Closer",
        "Consultant and Developer",  
        "Founder and Operator"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "How many points are added to an agent's score when they get certified?",
      options: ["50", "75", "100", "25"],
      correct: 2
    },
    {
      id: 4,
      question: "What does Lab Project Spartan use to verify credibility and track agent impact?",
      options: [
        "PDFs",
        "Digital NFTs called Digital Footprints",
        "Excel sheets",
        "Screenshot portfolios"
      ],
      correct: 1
    },
    {
      id: 5,
      question: "How many points does an agent earn for closing a lead?",
      options: ["10", "25", "50", "100"],
      correct: 2
    },
    {
      id: 6,
      question: "What makes Lab Project Spartan different from typical MLM or guru models?",
      options: [
        "We charge a monthly subscription",
        "We offer generic leads",
        "We only pay based on actual business results",
        "We make agents recruit endlessly"
      ],
      correct: 2
    },
    {
      id: 7,
      question: "What kind of businesses does Lab Project Spartan work with?",
      options: [
        "Only crypto projects",
        "Only local stores",
        "Businesses looking to enter the new era of AI, media, and automation",
        "Just e-commerce startups"
      ],
      correct: 2
    },
    {
      id: 8,
      question: "What is the reward when a Closer earns recurring affiliate commission?",
      options: ["25 points", "75 points", "10 points", "0 points"],
      correct: 0
    },
    {
      id: 9,
      question: "What is the goal of the Interest Consultant role?",
      options: [
        "Sell products to random people",
        "Help businesses fix surface-level issues",
        "Prove that most businesses fail for a reason and help them evolve",
        "Copy guru funnels"
      ],
      correct: 2
    },
    {
      id: 10,
      question: "What's the first thing new agents should do to start earning?",
      options: [
        "Buy a course",
        "Start shadowing deals and learning the pitch system",
        "Build a personal brand",
        "Create social media posts"
      ],
      correct: 1
    }
  ];

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      // Simulate wallet connection for demo
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      setWalletAddress(mockAddress);
      setWalletConnected(true);
    }
  };

  const startQuiz = () => {
    setCurrentView('quiz');
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizComplete(false);
    setQuizAttempted(true);
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz complete, calculate score
      const correctAnswers = newAnswers.reduce((total, answer, index) => {
        return total + (answer === quizQuestions[index].correct ? 1 : 0);
      }, 0);
      setScore(correctAnswers);
      setQuizComplete(true);
      setCurrentView('results');
    }
  };

  const mintNFT = async () => {
    if (!walletConnected) {
      await connectWallet();
      return;
    }
    
    setMintingNFT(true);
    // Simulate NFT minting process
    setTimeout(() => {
      setNftMinted(true);
      setMintingNFT(false);
      if (score >= 8) {
        setAgentScore(prev => prev + 100);
        setAchievements(prev => [...prev, {
          id: Date.now(),
          title: 'Full-Time Agent Certification',
          description: 'Passed the Sparta Agent Quiz with excellence',
          points: 100,
          icon: <Trophy className="w-6 h-6 text-yellow-500" />
        }]);
      }
      setCurrentView('dashboard');
    }, 3000);
  };

  const getRank = (score) => {
    if (score >= 1000) return { name: 'Spartan Elite', color: 'text-purple-600', icon: <Crown className="w-5 h-5" /> };
    if (score >= 750) return { name: 'Spartan Commander', color: 'text-red-600', icon: <Star className="w-5 h-5" /> };
    if (score >= 500) return { name: 'Spartan Warrior', color: 'text-blue-600', icon: <Zap className="w-5 h-5" /> };
    if (score >= 250) return { name: 'Spartan Recruit', color: 'text-green-600', icon: <Target className="w-5 h-5" /> };
    return { name: 'General', color: 'text-gray-600', icon: <Award className="w-5 h-5" /> };
  };

  const currentRank = getRank(agentScore);

  if (currentView === 'quiz') {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Sparta Agent Certification Quiz</h1>
                <div className="flex items-center gap-4">
                  <span className="text-gray-300">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full text-left p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'results') {
    const passed = score >= 8;
    const percentage = (score / quizQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              {passed ? (
                <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-4" />
              ) : (
                <XCircle className="w-24 h-24 text-red-400 mx-auto mb-4" />
              )}
              
              <h1 className="text-4xl font-bold mb-4">
                {passed ? 'Congratulations!' : 'Quiz Complete'}
              </h1>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 mb-8">
                <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {score}/{quizQuestions.length}
                </div>
                <div className="text-2xl mb-4">{percentage.toFixed(0)}% Score</div>
                
                {passed ? (
                  <div className="space-y-4">
                    <p className="text-green-400 text-lg font-semibold">✅ You passed the certification!</p>
                    <p className="text-gray-300">You're eligible to mint your Digital Footprint NFT and earn +100 Agent Score points.</p>
                    
                    {!walletConnected && (
                      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                        <p className="text-yellow-300 text-sm">Connect your Web3 wallet to mint your NFT</p>
                      </div>
                    )}

                    <button
                      onClick={mintNFT}
                      disabled={mintingNFT || nftMinted}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center mx-auto gap-2"
                    >
                      {mintingNFT ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Minting NFT...
                        </>
                      ) : nftMinted ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          NFT Minted!
                        </>
                      ) : (
                        <>
                          {!walletConnected ? 'Connect Wallet & Mint NFT' : 'Mint Digital Footprint NFT'}
                          <Trophy className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-red-400 text-lg">Minimum score required: 8/10 (80%)</p>
                    <p className="text-gray-300">Study the Lab Project Spartan materials and try again.</p>
                    
                    <button
                      onClick={startQuiz}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Retake Quiz
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setCurrentView('dashboard')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Digital Badge & Certification Center</h1>
                <p className="text-gray-600">Earn your Web3 credentials and track your progress</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {walletConnected && (
                <div className="text-right">
                  <div className="text-sm text-gray-500">Wallet Connected</div>
                  <div className="text-xs font-mono text-gray-700">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </div>
                </div>
              )}
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Admin
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Agent Score</h3>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{agentScore}</div>
            <div className="text-sm text-gray-500">Current credibility rating</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Current Rank</h3>
              {currentRank.icon}
            </div>
            <div className={`text-xl font-bold mb-2 ${currentRank.color}`}>{currentRank.name}</div>
            <div className="text-sm text-gray-500">Your current tier</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Digital Badges</h3>
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{nftMinted ? 1 : 0}</div>
            <div className="text-sm text-gray-500">Blockchain NFT credentials</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Certifications</h3>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{achievements.length}</div>
            <div className="text-sm text-gray-500">Completed certifications</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certification Quiz Section */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Sparta Agent Certification</h2>
              </div>
              <p className="opacity-90">Prove your knowledge and earn your digital badge</p>
            </div>
            
            <div className="p-6">
              {!quizAttempted ? (
                <div className="text-center">
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Get Certified?</h3>
                    <p className="text-gray-600 mb-4">Take the 10-question quiz about Lab Project Spartan to earn your certification.</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>• 10 multiple choice questions</p>
                      <p>• 80% minimum score to pass</p>
                      <p>• Unlimited attempts</p>
                      <p>• Earn +100 Agent Score points</p>
                    </div>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 flex items-center mx-auto gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Start Certification Quiz
                  </button>
                </div>
              ) : quizComplete && score >= 8 ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Certification Complete!</h3>
                  <p className="text-gray-600 mb-4">Quiz Score: {score}/10 ({((score/10)*100).toFixed(0)}%)</p>
                  
                  {!nftMinted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-green-800 font-medium">🎉 Ready to mint your Digital Badge!</p>
                      <p className="text-green-600 text-sm mt-1">Your achievement can be recorded permanently on the blockchain.</p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-blue-800 font-medium">✅ Digital Badge Minted!</p>
                      <p className="text-blue-600 text-sm mt-1">Your certification is now permanently recorded on the blockchain.</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={startQuiz}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake Quiz
                    </button>
                  </div>
                </div>
              ) : quizComplete ? (
                <div className="text-center">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Quiz Complete</h3>
                  <p className="text-gray-600 mb-4">Score: {score}/10 ({((score/10)*100).toFixed(0)}%) - Need 80% to pass</p>
                  <button
                    onClick={startQuiz}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 flex items-center mx-auto gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quiz Started</h3>
                    <p className="text-gray-600 mb-4">Click "Continue Quiz" to resume your certification test.</p>
                    <button
                      onClick={() => setCurrentView('quiz')}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200"
                    >
                      Continue Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Digital Badge & Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-500" />
              Digital Badges & Achievements
            </h2>
            
            {nftMinted ? (
              <div className="space-y-4">
                {/* NFT Badge Display */}
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Digital Footprint NFT</h3>
                      <p className="text-sm text-gray-600">Sparta Agent Certification Badge</p>
                      <p className="text-xs text-purple-600 font-medium">Blockchain Verified ✓</p>
                    </div>
                  </div>
                </div>

                {/* Achievement List */}
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    {achievement.icon}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">+{achievement.points}</div>
                      <div className="text-xs text-gray-500">Agent Score</div>
                    </div>
                  </div>
                ))}

                {!walletConnected && (
                  <button
                    onClick={connectWallet}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-5 h-5" />
                    Connect Wallet to View NFT
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Digital Badges Yet</h3>
                <p className="text-gray-500 mb-4">Complete your certification quiz to earn your first blockchain-verified digital badge.</p>
                {quizComplete && score >= 8 && !nftMinted && (
                  <button
                    onClick={mintNFT}
                    disabled={mintingNFT}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center mx-auto gap-2"
                  >
                    {mintingNFT ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Minting...
                      </>
                    ) : (
                      <>
                        <Trophy className="w-5 h-5" />
                        {!walletConnected ? 'Connect & Mint Badge' : 'Mint Digital Badge'}
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Score System Information */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Sparta Agent Score System</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Certification Milestones
              </h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Full-Time Agent Certification: +100 points</li>
                <li>• Closer Certification: +100 points</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance Rewards
              </h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Close a lead: +50 points</li>
                <li>• Affiliate commissions: +25 points</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Growth & Leadership
              </h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Add new agent: +25 points</li>
                <li>• Get promoted: +100 points</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpartaAgentSystem;