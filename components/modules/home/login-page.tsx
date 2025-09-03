import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function LoginPage() {
  return (
    <div className="min-h-screen mx-auto w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-sm text-muted-foreground">
            Please login to continue
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/auth/login?returnTo=/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Login with Auth0
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
