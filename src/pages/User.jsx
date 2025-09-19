import React, { useState } from 'react';
import { Crown, Trophy, Medal, Star, User as UserIcon, Phone, Users, ChevronLeft } from 'lucide-react';

function User() {
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const players = [
    { id: 1, name: "Otabek Nabiyev", score: 750, rank: 1 },
    { id: 2, name: "Sardor Ahmedov", score: 714, rank: 2 },
    { id: 3, name: "Dilshod Akramov", score: 691, rank: 3 },
    { id: 22, name: "Sarvar Usmonov", score: 320, rank: 22 },
    { id: 32, name: "Ali Boburov", score: 323, rank: 32 },
  ];

  const fetchUserProfile = async (userId = 1) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = {
        success: true,
        message: "User data fetched successfully",
        data: {
          id: userId,
          fullName: `Otabek Nabiyev ${userId === 1 ? '' : userId}`,
          phone: "+998 90 123 45 67",
          groupName: "Frontend Developers",
          groupId: 101,
          imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
          role: "Student"
        }
      };
      
      const userData = players.find(player => player.id === userId);

      setProfileData({ ...mockData.data, fullName: userData ? userData.name : mockData.data.fullName });
      setShowProfile(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-400" />;
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg";
      default:
        return "bg-gradient-to-r from-green-500 to-green-600 text-white";
    }
  };

  if (showProfile && profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-6">
        <div className="">
          <button
            onClick={() => setShowProfile(false)}
            className="mb-6 flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Orqaga</span>
          </button>

          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="relative z-10 text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={profileData.imageUrl}
                    alt={profileData.fullName}
                    className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {profileData.role}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{profileData.fullName}</h2>
                <p className="text-green-100 text-sm">ID: {profileData.id}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/95 rounded-xl p-4 shadow-lg flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Telefon raqam</p>
                    <p className="text-gray-800 font-semibold">{profileData.phone}</p>
                  </div>
                </div>

                <div className="bg-white/95 rounded-xl p-4 shadow-lg flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Guruh</p>
                    <p className="text-gray-800 font-semibold">{profileData.groupName}</p>
                    <p className="text-xs text-gray-400">ID: {profileData.groupId}</p>
                  </div>
                </div>

                <div className="bg-white/95 rounded-xl p-4 shadow-lg flex items-center gap-3">
                  <UserIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Rol</p>
                    <p className="text-gray-800 font-semibold">{profileData.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-end">
          <button
            onClick={() => fetchUserProfile()} 
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-lg"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Yuklanmoqda...</span>
              </>
            ) : (
              <>
                <UserIcon className="w-4 h-4" />
                <span>Profil</span>
              </>
            )}
          </button>
        </div>

        <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-green-600">Reyting jadvali</h2>
          </div>

          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={player.id}
                onClick={() => fetchUserProfile(player.id)} // Shu qator qo'shildi! 
                className="group bg-white/95 rounded-xl p-4 shadow-lg flex justify-between items-center cursor-pointer hover:bg-white/90 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getRankBadgeColor(player.rank)}`}>
                    {player.rank}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">{player.name}</span>
                    {player.rank <= 3 && (
                      <div className="text-xs text-green-600">
                        {player.rank === 1 ? "Birinchi O'rin" : player.rank === 2 ? "Ikkinchi O'rin" : "Uchinchi O'rin"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{player.score}</div>
                    <div className="flex gap-1 justify-end">
                      {[...Array(Math.min(3, Math.floor(player.score / 200)))].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  {getRankIcon(player.rank)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;