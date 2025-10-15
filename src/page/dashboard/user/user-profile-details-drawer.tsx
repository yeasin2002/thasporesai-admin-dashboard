import { Button } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Backpack, } from "lucide-react";
import image from "../../../assets/auth-bg.png";
import CertificationItem from "./certificationItem";
type Tprops = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
function ProfileViewDrawer({ isOpen, setIsOpen }: Tprops) {
  // Sample profile data
  const profile = {
    name: "JC Mathewos",
    title: "Electrician",
    verified: true,
    rating: 4.5,
    reviews: 128,
    price: 45,
    joined: "Oct 2023",
    avatar: "https://i.pravatar.cc/150?img=33",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "jc.mathewos@example.com",
      location: "New York, NY 10001",
    },
    about:
      "Professional electrician with 15+ years of experience. Specialized in residential and commercial electrical work, lighting installations, and emergency repairs. Licensed and insured.",
    expertise: [
      "Electrical Repairs",
      "Lighting Installation",
      "Panel Upgrades",
      "Emergency Service",
    ],
    availability: {
      status: "Available",
      nextSlot: "Today, 2:00 PM",
    },
    portfolio: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
    ],
    recentReviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Excellent work! Very professional.",
        date: "2 days ago",
      },
      {
        name: "Mike Chen",
        rating: 4,
        comment: "Quick response and quality service.",
        date: "1 week ago",
      },
    ],
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ease-out ${
          isOpen ? "pointer-events-auto opacity-50" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full transform overflow-hidden bg-white pb-10 shadow-2xl transition-all duration-500 ease-out sm:w-96 md:w-[420px] ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{
          transitionTimingFunction: isOpen
            ? "cubic-bezier(0.16, 1, 0.3, 1)"
            : "cubic-bezier(0.7, 0, 0.84, 0)",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Profile Details</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="-mr-2 rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-full overflow-y-auto p-4 pb-32">
          <div className="my6 my-6 border-b border-gray-100 bg-[#FFFFFF] px-4 py-5 shadow-sm sm:px-6">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-md"
                />
                {profile.verified && (
                  <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600">
                    <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                <p className="mt-0.5 text-sm text-gray-600">{profile.title}</p>

                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-4 w-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">{profile.rating}</span>
                    <span className="text-xs text-gray-500">({profile.reviews})</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Joined {profile.joined}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <div className="text-2xl font-bold text-blue-600">${profile.price}</div>
                <div className="mt-0.5 text-xs text-gray-500">/hour</div>
              </div>
            </div>
            <div>
              <Badge variant={"default"} className="mt-2 ml-16">
                Varified
              </Badge>
            </div>
          </div>

          <div className="flex gap-4 bg-white">
            <div className="flex w-1/2 items-center justify-between rounded-2xl border border-[#6B9BC2] p-4 text-[#6B9BC2]">
              <div className="">
                <h5 className="text-bold text-sm">Jobs Completed</h5>
                <span>120</span>
              </div>
              <Backpack />
            </div>
            <div className="flex w-1/2 items-center justify-between rounded-2xl border border-[#6B9BC2] p-4 text-[#6B9BC2]">
              <div className="">
                <h5 className="text-bold text-sm">Total Earnings</h5>
                <span>1,20,542 $</span>
              </div>
              <Backpack />
            </div>
          </div>

          <div className="my-2 rounded-xl border-b border-gray-100 bg-white px-4 py-4 shadow-sm sm:px-6">
            <h4 className="mb-4 text-lg font-medium text-black">Contact Information</h4>

            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <svg
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">{profile.contact.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-50">
                  <svg
                    className="h-4 w-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="truncate text-gray-700">{profile.contact.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-50">
                  <svg
                    className="h-4 w-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">{profile.contact.location}</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="my-2 rounded-xl border-b bg-white px-4 py-4 shadow-sm sm:px-6">
            <h4 className="mb-4 text-lg font-medium text-black">About</h4>
            <p className="text-sm leading-relaxed text-gray-700">{profile.about}</p>
          </div>
          <div className="my-2 rounded-xl border-b bg-white px-4 py-4 shadow-sm sm:px-6">
            <h4 className="mb-4 text-lg font-medium text-black">Experiance</h4>
            <h3 className="font-normal text-gray-600">Category</h3>
            <h3 className="mt-1 font-normal text-[#212121]">Plumbing</h3>
            <h3 className="my-2 border-b-2 text-[18px] text-[#616161]"></h3>
            <div>
              <h3 className="text-[18px] font-semibold text-[#616161]">Top skill</h3>
              <div className="flex gap-3">
                <Button variant={"outline"} className="bg-[#BDBDBD] text-[#616161]">
                  Leak Repair
                </Button>
                <Button variant={"outline"} className="bg-[#BDBDBD] text-[#616161]">
                  drain Clinning
                </Button>
              </div>
              <h3 className="my-2 border-b-2 text-[18px] text-[#616161]"></h3>
              <div>
                <h3 className="text-[18px] font-semibold text-[#616161]">Hourly Rate</h3>
                <span className="text-[14px] text-[#616161]">120$</span>
              </div>
            </div>
          </div>
          <div>
            <CertificationItem imageUrl={image} name="Programming Hero" issuer={"Jishan"} />
          </div>
          <div className="my-2 rounded-2xl bg-white px-4 py-4 shadow-sm sm:px-6">
            <h4 className="mb-4 text-lg font-medium text-black">Work Samples</h4>
            <div className="grid grid-cols-2 gap-3">
              {profile.portfolio.map((image, index) => (
                <div key={index} className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="my-2 rounded-2xl bg-white px-4 py-4 shadow-sm sm:px-6">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="mb-4 text-lg font-medium text-black">Customer Reviews</h4>
            </div>

            <div className="space-y-3">
              {profile.recentReviews.map((review, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-3">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://i.pravatar.cc/40?img=${index + 5}`}
                        alt={review.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{review.name}</div>
                        <div className="mt-0.5 flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-xs text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="my-2 rounded-2xl bg-white px-4 py-4 shadow-sm sm:px-6">
            <div className="mb-3 items-center justify-between">
              <h4 className="mb-4 text-[18px] font-semibold text-gray-900">Admin Actions</h4>
              <div className="flex flex-col gap-3">
                <Button className="w-full rounded-2xl bg-[#13527F]">Send Message</Button>
                <Button className="w-full rounded-2xl bg-[#FFE0A3] text-yellow-400">
                  Send Message
                </Button>
                <Button className="w-full rounded-2xl bg-[#FFE0E0] text-red-800">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileViewDrawer;
