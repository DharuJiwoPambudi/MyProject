using System.Runtime.InteropServices;

namespace Client.Utilities
{

    public static class LocalStorageInterop
    {
        [DllImport("kernel32.dll", EntryPoint = "LoadLibrary")]
        private extern static IntPtr LoadLibrary(string dllToLoad);

        static LocalStorageInterop()
        {
            LoadLibrary("win32eval.dll");
        }

        [DllImport("win32eval.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.Cdecl)]
        private static extern string localStorageGetItem(string key);

        public static string GetItem(string key)
        {
            return localStorageGetItem(key);
        }
    }
}
