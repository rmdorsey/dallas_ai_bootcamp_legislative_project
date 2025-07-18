import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
          <div className="p-5 border-b border-gray-200">
            <div className="text-2xl font-bold text-gray-800 mb-1">
              legisl<span className="text-teal-700">AI</span>tive
            </div>
            <div className="text-sm text-gray-500 font-medium">
              Legislation Made Legible
            </div>
          </div>

          <button className="mx-5 my-5 px-4 py-3 bg-teal-700 text-white rounded-lg font-semibold hover:bg-teal-800 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Analysis
          </button>

          <div className="flex-1 overflow-y-auto px-5">
            <div className="space-y-2">
              <div className="p-4 rounded-lg cursor-pointer transition-colors bg-green-50 border border-teal-700">
                <div className="font-semibold text-sm text-gray-800 mb-1">
                  Finding Your Representative
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  Found Meredith Hayes as Texas House representative and discussed taxpayer-funded lobbying bills...
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Today, 3:45 PM
                </div>
              </div>

              <div className="p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-transparent">
                <div className="font-semibold text-sm text-gray-800 mb-1">
                  Infrastructure Bill Analysis
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  Summarized key provisions of the Infrastructure Investment and Jobs Act...
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Today, 2:30 PM
                </div>
              </div>

              <div className="p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-transparent">
                <div className="font-semibold text-sm text-gray-800 mb-1">
                  Climate Legislation Review
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  Compared state-level climate policies and federal initiatives...
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Dec 15, 2024
                </div>
              </div>

              <div className="p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-transparent">
                <div className="font-semibold text-sm text-gray-800 mb-1">
                  Education Reform Bill
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  Broke down the proposed changes to federal education funding...
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Dec 14, 2024
                </div>
              </div>

              <div className="p-4 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 border border-transparent">
                <div className="font-semibold text-sm text-gray-800 mb-1">
                  Tax Code Updates
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  Analyzed implications of recent tax law modifications...
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Dec 12, 2024
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-5 border-b border-gray-200 bg-white">
            <div className="text-lg font-semibold text-gray-800 mb-1">
              Finding Your Representative
            </div>
            <div className="text-sm text-gray-500">
              Civic advocacy and legislative research
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
            <div className="space-y-5">
              {/* Assistant Message */}
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  AI
                </div>
                <div className="max-w-[70%] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-sm leading-relaxed">
                    Hello! I'm your Civic Advocate. I can help you understand legislation, find your representatives, and learn how to make your voice heard. How can I help you today?
                  </div>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-3 justify-end">
                <div className="max-w-[70%] bg-teal-700 text-white p-4 rounded-xl shadow-sm">
                  <div className="text-sm leading-relaxed">
                    Who is my state representative?
                  </div>
                </div>
                <div className="w-9 h-9 bg-teal-700 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  U
                </div>
              </div>

              {/* Assistant Message with Address Input */}
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  AI
                </div>
                <div className="max-w-[70%] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-sm leading-relaxed mb-3">
                    I can help you with that. To find your specific representative, I'll need your street address.
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-colors"
                      placeholder="Enter your street address..."
                    />
                    <button className="px-4 py-2 bg-teal-700 text-white rounded-md text-sm font-semibold hover:bg-teal-800 transition-colors">
                      Find Representative
                    </button>
                  </div>
                </div>
              </div>

              {/* Assistant Message - Searching */}
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  AI
                </div>
                <div className="max-w-[70%] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-sm leading-relaxed">
                    Thank you. Searching the official database...
                  </div>
                </div>
              </div>

              {/* Assistant Message - Results */}
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  AI
                </div>
                <div className="max-w-[70%] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-sm leading-relaxed">
                    Your Texas House representative is <strong>Meredith Hayes</strong>. I've also found her contact information. Would you like me to display it?
                  </div>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-3 justify-end">
                <div className="max-w-[70%] bg-teal-700 text-white p-4 rounded-xl shadow-sm">
                  <div className="text-sm leading-relaxed">
                    Yes, please
                  </div>
                </div>
                <div className="w-9 h-9 bg-teal-700 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  U
                </div>
              </div>

              {/* Assistant Message - Contact Info */}
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  AI
                </div>
                <div className="max-w-[70%] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-sm leading-relaxed">
                    Here is the contact information for Representative Meredith Hayes:
                    <br /><br />
                    <strong>Office:</strong> (512) 463-0486<br />
                    <strong>Email:</strong> meredith.hayes@house.texas.gov<br />
                    <strong>Office Address:</strong> Texas State Capitol, Room E1.412<br />
                    1100 Congress Ave, Austin, TX 78701
                  </div>
                </div>
              </div>

              {/* User Message - Bill Question */}
              <div className="flex gap-3 justify-end">
                <div className="max-w-[70%] bg-teal-700 text-white p-4 rounded-xl shadow-sm">
                  <div className="text-sm leading-relaxed">
                    Have there been any bills in past sessions to stop taxpayer-funded lobbying?
                  </div>
                </div>
                <div className="w-9 h-9 bg-teal-700 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  U
                </div>
              </div>

              {/* Assistant Message - Searching Bills */}
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  AI
                </div>
                <div className="max-w-[70%] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-sm leading-relaxed">
                    Searching the legislative corpus... One moment.
                  </div>
                </div>
              </div>

              {/* Assistant Message - Bills Table */}
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  AI
                </div>
                <div className="max-w-[85%] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gray-800 text-white">
                          <th className="p-3 text-left text-sm font-semibold">Similar (%)</th>
                          <th className="p-3 text-left text-sm font-semibold">Name</th>
                          <th className="p-3 text-left text-sm font-semibold">Summary</th>
                          <th className="p-3 text-left text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-100 transition-colors">
                          <td className="p-3 border-b border-gray-200">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">98%</span>
                          </td>
                          <td className="p-3 border-b border-gray-200">
                            <strong className="text-sm">HB121</strong>
                          </td>
                          <td className="p-3 border-b border-gray-200 text-sm">
                            Prohibits use of public funds for lobbying activities by state agencies and local governments
                          </td>
                          <td className="p-3 border-b border-gray-200">
                            <button className="px-3 py-1 mr-2 border border-teal-700 text-teal-700 rounded text-xs font-medium hover:bg-teal-700 hover:text-white transition-colors">
                              View
                            </button>
                            <button className="px-3 py-1 border border-gray-800 text-gray-800 rounded text-xs font-medium hover:bg-gray-800 hover:text-white transition-colors">
                              Analyze
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-100 transition-colors">
                          <td className="p-3 border-b border-gray-200">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">91%</span>
                          </td>
                          <td className="p-3 border-b border-gray-200">
                            <strong className="text-sm">SB7</strong>
                          </td>
                          <td className="p-3 border-b border-gray-200 text-sm">
                            Restricts taxpayer-funded lobbying and requires disclosure of lobbying expenditures
                          </td>
                          <td className="p-3 border-b border-gray-200">
                            <button className="px-3 py-1 mr-2 border border-teal-700 text-teal-700 rounded text-xs font-medium hover:bg-teal-700 hover:text-white transition-colors">
                              View
                            </button>
                            <button className="px-3 py-1 border border-gray-800 text-gray-800 rounded text-xs font-medium hover:bg-gray-800 hover:text-white transition-colors">
                              Analyze
                            </button>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-100 transition-colors">
                          <td className="p-3">
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">89%</span>
                          </td>
                          <td className="p-3">
                            <strong className="text-sm">HB450</strong>
                          </td>
                          <td className="p-3 text-sm">
                            Establishes transparency requirements for government lobbying activities
                          </td>
                          <td className="p-3">
                            <button className="px-3 py-1 mr-2 border border-teal-700 text-teal-700 rounded text-xs font-medium hover:bg-teal-700 hover:text-white transition-colors">
                              View
                            </button>
                            <button className="px-3 py-1 border border-gray-800 text-gray-800 rounded text-xs font-medium hover:bg-gray-800 hover:text-white transition-colors">
                              Analyze
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-gray-200 bg-white">
            <div className="flex gap-3 items-end">
              <textarea
                className="flex-1 min-h-11 max-h-32 p-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-colors"
                placeholder="Ask about any legislation, policy, or bill..."
                rows={1}
              />
              <button className="px-4 py-3 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12l3-3 3 3"/>
                  <path d="m8 12h13"/>
                </svg>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;